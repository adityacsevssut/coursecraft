// backend/utils/cache.js
// In-memory cache implementation with TTL (Time To Live)
class InMemoryCache {
  constructor() {
    this.cache = new Map();
    this.timers = new Map();
  }

  /**
   * Set a value in cache with TTL
   * @param {string} key - Cache key
   * @param {*} value - Value to cache
   * @param {number} ttl - Time to live in milliseconds (default: 5 minutes)
   */
  set(key, value, ttl = 5 * 60 * 1000) { // Default 5 minutes
    // Clear existing timer if exists
    if (this.timers.has(key)) {
      clearTimeout(this.timers.get(key));
      this.timers.delete(key);
    }

    // Set the value
    this.cache.set(key, {
      value,
      timestamp: Date.now(),
      ttl
    });

    // Set expiration timer
    if (ttl > 0) {
      const timer = setTimeout(() => {
        this.delete(key);
      }, ttl);
      this.timers.set(key, timer);
    }
  }

  /**
   * Get a value from cache
   * @param {string} key - Cache key
   * @returns {*} Cached value or undefined if not found/expired
   */
  get(key) {
    const item = this.cache.get(key);
    if (!item) {
      return undefined;
    }

    return item.value;
  }

  /**
   * Check if key exists in cache
   * @param {string} key - Cache key
   * @returns {boolean} True if exists and not expired
   */
  has(key) {
    return this.cache.has(key);
  }

  /**
   * Delete a key from cache
   * @param {string} key - Cache key
   */
  delete(key) {
    if (this.timers.has(key)) {
      clearTimeout(this.timers.get(key));
      this.timers.delete(key);
    }
    this.cache.delete(key);
  }

  /**
   * Clear all cache
   */
  clear() {
    for (const timer of this.timers.values()) {
      clearTimeout(timer);
    }
    this.timers.clear();
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  stats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }

  /**
   * Get cache size
   */
  size() {
    return this.cache.size;
  }
}

// Global cache instance
const cache = new InMemoryCache();

/**
 * Cache decorator/wrapper for async functions
 * @param {string} key - Cache key
 * @param {Function} fn - Function to wrap
 * @param {number} ttl - Time to live in milliseconds
 */
const cachedAsync = async (key, fn, ttl = 5 * 60 * 1000) => {
  const cachedValue = cache.get(key);
  if (cachedValue !== undefined) {
    return cachedValue;
  }

  const result = await fn();
  cache.set(key, result, ttl);
  return result;
};

/**
 * Cache middleware for Express routes
 */
const cacheMiddleware = (key, ttl = 5 * 60 * 1000) => {
  return async (req, res, next) => {
    const cacheKey = typeof key === 'function' ? key(req) : key;
    const cachedResult = cache.get(cacheKey);

    if (cachedResult) {
      // Send cached response
      res.locals.cached = true;
      res.json(cachedResult);
      return;
    }

    // Override res.json to cache the response
    const originalJson = res.json;
    res.json = function(data) {
      // Cache the response data
      cache.set(cacheKey, data, ttl);
      res.locals.cached = false;
      return originalJson.call(this, data);
    };

    next();
  };
};

/**
 * Invalidate specific cache key
 */
const invalidateCache = (key) => {
  if (key) {
    cache.delete(key);
  } else {
    cache.clear();
  }
};

/**
 * Get all cache keys
 */
const getAllCacheKeys = () => {
  return Array.from(cache.cache.keys());
};

export {
  cache,
  cachedAsync,
  cacheMiddleware,
  invalidateCache,
  getAllCacheKeys
};