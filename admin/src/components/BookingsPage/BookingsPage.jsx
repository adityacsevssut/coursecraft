import React, { useEffect, useState, useRef } from "react";
import {
  Search,
  User,
  BookOpen,
  BadgeIndianRupee,
  GraduationCap,
} from "lucide-react";
import { bookingsStyles } from "../../assets/dummyStyles";

const API_BASE = "http://localhost:4000";

const BookingsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page] = useState(1); // expose later for pagination
  const limit = 200;

  // debounce timer and abort controller
  const debounceRef = useRef(null);
  const abortRef = useRef(null);

  const fetchBookings = async (search = "") => {
    setLoading(true);
    setError(null);

    // abort previous
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const q = new URLSearchParams();
      if (search) q.set("search", search);
      q.set("limit", String(limit));
      q.set("page", String(page));

      const res = await fetch(`${API_BASE}/api/booking?${q.toString()}`, {
        method: "GET",
        signal: controller.signal,
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(
          body.message || `Request failed with status ${res.status}`
        );
      }

      const data = await res.json();
      if (data && data.success) {
        const normalized = (data.bookings || []).map((b, idx) => ({
          id: b._id || b.bookingId || String(idx),
          // userRef removed — use studentName field present in backend
          studentName: b.studentName || b.userName || "Unknown student",
          courseName: b.courseName || "Untitled course",
          price: b.price ?? 0,
          teacherName: b.teacherName || "Unknown teacher",
          purchaseDate: b.createdAt
            ? new Date(b.createdAt).toISOString().split("T")[0]
            : b.purchaseDate || "",
          raw: b,
        }));

        setBookings(normalized);
      } else {
        setBookings([]);
        setError(data?.message || "No data");
      }
    } catch (err) {
      if (err.name === "AbortError") {
        // aborted — ignore
      } else {
        console.error("fetchBookings error:", err);
        setError(err.message || "Failed to fetch bookings");
      }
    } finally {
      setLoading(false);
    }
  };

  // initial fetch
  useEffect(() => {
    fetchBookings("");
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // debounce search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchBookings(searchTerm.trim());
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  return (
    <div className={bookingsStyles.pageContainer}>
      <div className={bookingsStyles.contentContainer}>
        {/* Header */}
        <div className={bookingsStyles.headerContainer}>
          <h1 className={bookingsStyles.headerTitle}>Course Bookings</h1>
          <p className={bookingsStyles.headerSubtitle}>
            Manage and view all student course purchases
          </p>
        </div>

        {/* Search */}
        <div className={bookingsStyles.searchContainer}>
          <div className={bookingsStyles.searchInputContainer}>
            <Search className={bookingsStyles.searchIcon} />
            <input
              type="text"
              placeholder="Search by student, course, or teacher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={bookingsStyles.searchInput}
            />
          </div>
        </div>

        {/* Loading / Error (keeps layout stable) */}
        <div style={{ minHeight: 36 }}>
          {loading && (
            <div className={bookingsStyles.loadingState}>
              <p>Loading bookings…</p>
            </div>
          )}
          {!loading && error && (
            <div className={bookingsStyles.errorState}>
              <p>Error: {error}</p>
            </div>
          )}
        </div>

        {/* Bookings Grid */}
        <div className={bookingsStyles.bookingsGrid}>
          {!loading &&
            bookings.map((booking) => (
              <div key={booking.id} className={bookingsStyles.bookingCard}>
                {/* Student Section */}
                <div className={bookingsStyles.studentSection}>
                  <div className={bookingsStyles.studentIconContainer}>
                    <User className={bookingsStyles.studentIcon} />
                  </div>
                  <div className={bookingsStyles.studentInfo}>
                    <h3 className={bookingsStyles.studentName}>
                      {booking.studentName}
                    </h3>
                    <p className={bookingsStyles.purchaseDate}>
                      Purchased on {booking.purchaseDate || "—"}
                    </p>
                  </div>
                </div>

                {/* Course Details */}
                <div className={bookingsStyles.courseDetails}>
                  <div className={bookingsStyles.detailItem}>
                    <BookOpen className={bookingsStyles.detailIcon} />
                    <span className={bookingsStyles.detailLabel}>Course:</span>
                    <span className={bookingsStyles.detailValue}>
                      {booking.courseName}
                    </span>
                  </div>

                  <div className={bookingsStyles.detailItem}>
                    <BadgeIndianRupee className={bookingsStyles.detailIcon} />
                    <span className={bookingsStyles.detailLabel}>Price:</span>
                    <span className={bookingsStyles.priceValue}>
                      ₹{booking.price}
                    </span>
                  </div>

                  <div className={bookingsStyles.detailItem}>
                    <GraduationCap className={bookingsStyles.detailIcon} />
                    <span className={bookingsStyles.detailLabel}>Teacher:</span>
                    <span className={bookingsStyles.detailValue}>
                      {booking.teacherName}
                    </span>
                  </div>
                </div>

                {/* Status */}
                <div className={bookingsStyles.statusContainer}>
                  <span className={bookingsStyles.statusBadge}>Completed</span>
                </div>
              </div>
            ))}
        </div>

        {/* No Results */}
        {!loading && bookings.length === 0 && !error && (
          <div className={bookingsStyles.emptyState}>
            <div className={bookingsStyles.emptyContainer}>
              <Search className={bookingsStyles.emptyIcon} />
              <h3 className={bookingsStyles.emptyTitle}>No bookings found</h3>
              <p className={bookingsStyles.emptyText}>
                No bookings match your search criteria. Try adjusting your
                search terms.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
