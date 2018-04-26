"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Booking {
    constructor(model = null) {
        this.id = '';
        this.userId = '';
        this.spaceId = '';
        this.numGuests = 0;
        this.finalPrice = 0;
        this.currency = '';
        this.bookingStatus = null;
        this.paymentStatus = null;
        this.bookingDates = [];
        this.userNotes = '';
        this.hostNotes = '';
        this.poaDetails = null;
        this.cancellation = null;
        this.createdOn = new Date();
        if (model) {
            this.id = model.id || '';
            this.userId = model.userId || '';
            this.spaceId = model.spaceId || '';
            this.numGuests = model.numGuests || 0;
            this.finalPrice = model.finalPrice || 0;
            this.currency = model.currency || '';
            this.bookingStatus = model.bookingStatus || null;
            this.paymentStatus = model.paymentStatus || null;
            this.bookingDates = (model.bookingDates || []).map(date => new BookingDate(date));
            this.userNotes = model.userNotes || '';
            this.hostNotes = model.hostNotes || '';
            this.poaDetails = model.poaDetails ? new PoaDetails(model.poaDetails) : null;
            this.cancellation = model.cancellation ? new Cancellation(model.cancellation) : null;
            this.createdOn = model.createdOn || new Date();
        }
    }
}
exports.Booking = Booking;
var BookingStatus;
(function (BookingStatus) {
    BookingStatus["PENDING"] = "Pending";
    BookingStatus["ENQUIRY"] = "Enquiry";
    BookingStatus["BOOKED"] = "Booked";
    BookingStatus["APPROVED"] = "Approved";
    BookingStatus["DECLINED"] = "Declined";
    BookingStatus["CONFIRMED"] = "Confirmed";
    BookingStatus["CANCELED"] = "Canceled";
    BookingStatus["COMPLETED"] = "Completed";
})(BookingStatus || (BookingStatus = {}));
exports.BookingStatus = BookingStatus;
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "Pending";
    PaymentStatus["AUTHORIZED"] = "Authorized";
    PaymentStatus["COMPLETED"] = "Completed";
})(PaymentStatus || (PaymentStatus = {}));
exports.PaymentStatus = PaymentStatus;
class BookingDate {
    constructor(model = null) {
        this.date = new Date();
        this.fromHour = 0;
        this.toHour = 0;
        if (model) {
            this.date = model.date || new Date();
            this.fromHour = model.fromHour || 0;
            this.toHour = model.toHour || 0;
        }
    }
}
exports.BookingDate = BookingDate;
class PoaDetails {
    constructor(model = null) {
        this.name = '';
        this.email = '';
        this.number = '';
        this.message = '';
        if (model) {
            this.name = model.name || '';
            this.email = model.email || '';
            this.number = model.number || '';
            this.message = model.message || '';
        }
    }
}
exports.PoaDetails = PoaDetails;
class Cancellation {
    constructor(model = null) {
        this.reason = '';
        this.date = new Date();
        if (model) {
            this.reason = model.reason || '';
            this.date = model.date || new Date();
        }
    }
}
exports.Cancellation = Cancellation;
exports.default = [
    Booking,
    BookingDate,
    BookingStatus,
    Cancellation,
    PaymentStatus,
    PoaDetails,
];
//# sourceMappingURL=booking.js.map