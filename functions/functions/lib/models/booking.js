"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BookingRequest {
    constructor(model = null) {
        this.id = '';
        this.createdOn = new Date();
        this.userId = '';
        this.spaceBooking = null;
        if (model) {
            this.id = model.id;
            this.createdOn = model.createdOn;
            this.userId = model.userId;
            this.spaceBooking = new BookingSpace(model.spaceBooking);
        }
    }
}
exports.BookingRequest = BookingRequest;
class Booking {
    constructor(model = null) {
        this.id = '';
        this.userId = '';
        this.createdOn = null;
        this.finalPrice = 0;
        this.currency = '';
        this.paymentStatus = '';
        this.bookingStatus = '';
        this.userNotes = '';
        this.hostNotes = '';
        this.cancellation = null;
        this.spaceBookings = [];
        if (model) {
            this.id = model.id || '';
            this.userId = model.userId || '';
            this.createdOn = model.createdOn || null;
            this.finalPrice = model.finalPrice || 0;
            this.currency = model.currency || '';
            this.paymentStatus = model.paymentStatus || '';
            this.bookingStatus = model.bookingStatus || '';
            this.userNotes = model.userNotes || '';
            this.hostNotes = model.hostNotes || '';
            this.cancellation = new Cancellation(model.cancellation) || null;
            this.spaceBookings = (model.spaceBookings || []).map(booking => new BookingSpace(booking));
        }
    }
}
exports.Booking = Booking;
class Cancellation {
    constructor(model = null) {
        this.reason = '';
        this.date = null;
        if (model) {
            this.reason = model.reason || '';
            this.date = model.date || null;
        }
    }
}
exports.Cancellation = Cancellation;
class BookingSpace {
    constructor(model = null) {
        this.spaceId = '';
        this.numGuests = 0;
        this.bookingDates = [];
        if (model) {
            this.spaceId = model.spaceId || '';
            this.numGuests = model.numGuests || 0;
            this.bookingDates = model.bookingDates.map(date => new BookingDate(date)) || [];
        }
    }
}
exports.BookingSpace = BookingSpace;
class BookingDate {
    constructor(model = null) {
        this.date = null;
        this.fromHour = 0;
        this.toHour = 0;
        if (model) {
            this.date = model.date || null;
            this.fromHour = model.fromHour || 0;
            this.toHour = model.toHour || 0;
        }
    }
}
exports.BookingDate = BookingDate;
exports.default = [
    BookingRequest,
    Booking,
    Cancellation,
    BookingSpace,
    BookingDate
];
//# sourceMappingURL=booking.js.map