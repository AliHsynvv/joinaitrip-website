"use client";

// =============================================================================
// HOTEL RESERVATION PAGE
// Multi-step booking flow with user information form and reservation summary
// =============================================================================

import { useState, Suspense } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
    MapPin,
    Check,
    Wifi,
    Car,
    Eye,
    Waves,
    Coffee,
    ChevronDown
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface Hotel {
    id: string;
    name: string;
    image: string;
    rating: number;
    ratingText: string;
    reviewCount: number;
    location: string;
    address: string;
}

interface Room {
    id: string;
    name: string;
    pricePerNight: number;
    totalPrice: number;
}

// -----------------------------------------------------------------------------
// Sample Data
// -----------------------------------------------------------------------------

const SAMPLE_HOTELS: Hotel[] = [
    {
        id: "1",
        name: "Crowne Plaza Guangzhou Huadu by IHG",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
        rating: 8.0,
        ratingText: "Very Good",
        reviewCount: 1900,
        location: "Guangzhou, China",
        address: "391 Dongfeng Road Yuexiu District, Yue Xiu, 510030"
    },
    {
        id: "2",
        name: "Four Seasons Hotel Dubai",
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop",
        rating: 9.4,
        ratingText: "Exceptional",
        reviewCount: 2341,
        location: "Dubai, UAE",
        address: "Jumeirah Beach Road, Dubai"
    },
    {
        id: "3",
        name: "The Ritz-Carlton Tokyo",
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop",
        rating: 9.6,
        ratingText: "Exceptional",
        reviewCount: 1876,
        location: "Tokyo, Japan",
        address: "Tokyo Midtown, 9-7-1 Akasaka, Minato-ku"
    },
    {
        id: "4",
        name: "Park Hyatt Paris-Vendôme",
        image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop",
        rating: 9.3,
        ratingText: "Wonderful",
        reviewCount: 1542,
        location: "Paris, France",
        address: "5 Rue de la Paix, 75002 Paris"
    },
    {
        id: "5",
        name: "Marina Bay Sands Singapore",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop",
        rating: 9.0,
        ratingText: "Wonderful",
        reviewCount: 4521,
        location: "Singapore",
        address: "10 Bayfront Avenue, Singapore 018956"
    },
    {
        id: "6",
        name: "Burj Al Arab Jumeirah",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=300&fit=crop",
        rating: 9.8,
        ratingText: "Exceptional",
        reviewCount: 3241,
        location: "Dubai, UAE",
        address: "Jumeirah Beach Road, Dubai"
    }
];

const SAMPLE_ROOMS: Room[] = [
    { id: "1", name: "King Deluxe with View", pricePerNight: 256, totalPrice: 769 },
    { id: "2", name: "Twin Room", pricePerNight: 210, totalPrice: 630 },
    { id: "3", name: "Deluxe Suite", pricePerNight: 450, totalPrice: 1350 },
];

const COUNTRIES = [
    "Azerbaijan", "Turkey", "United States", "United Kingdom", "Germany",
    "France", "Russia", "China", "Japan", "UAE", "Other"
];

// -----------------------------------------------------------------------------
// Step Indicator Component
// -----------------------------------------------------------------------------

function StepIndicator({ currentStep }: { currentStep: number }) {
    const steps = [
        { num: 1, label: "Your choice" },
        { num: 2, label: "Your information" },
        { num: 3, label: "Complete the reservation" },
    ];

    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            backgroundColor: "#ffffff",
            borderBottom: "1px solid #e5e7eb",
        }}>
            {steps.map((step, idx) => (
                <div key={step.num} style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{
                            width: "28px",
                            height: "28px",
                            borderRadius: "50%",
                            backgroundColor: currentStep >= step.num ? "#06b6d4" : "#e5e7eb",
                            color: currentStep >= step.num ? "#ffffff" : "#9ca3af",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "14px",
                            fontWeight: 600,
                        }}>
                            {currentStep > step.num ? <Check size={16} /> : step.num}
                        </div>
                        <span style={{
                            fontSize: "14px",
                            fontWeight: currentStep === step.num ? 600 : 400,
                            color: currentStep >= step.num ? "#1f2937" : "#9ca3af",
                        }}>
                            {step.label}
                        </span>
                    </div>
                    {idx < steps.length - 1 && (
                        <div style={{
                            width: "120px",
                            height: "2px",
                            backgroundColor: currentStep > step.num ? "#06b6d4" : "#e5e7eb",
                            margin: "0 16px",
                        }} />
                    )}
                </div>
            ))}
        </div>
    );
}

// -----------------------------------------------------------------------------
// Reservation Sidebar Component
// -----------------------------------------------------------------------------

function ReservationSidebar({
    hotel,
    room,
    checkIn,
    checkOut,
    nights,
    adults
}: {
    hotel: Hotel;
    room: Room;
    checkIn: string;
    checkOut: string;
    nights: number;
    adults: number;
}) {
    const taxesAndFees = Math.round(room.totalPrice * 0.08);
    const cancellationFee = Math.round(room.totalPrice * 0.47);

    return (
        <div style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            overflow: "hidden",
            position: "sticky",
            top: "100px",
        }}>
            {/* Hotel Image */}
            <img
                src={hotel.image}
                alt={hotel.name}
                style={{ width: "100%", height: "160px", objectFit: "cover" }}
            />

            {/* Hotel Info */}
            <div style={{ padding: "16px", borderBottom: "1px solid #f3f4f6" }}>
                <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1f2937", marginBottom: "4px" }}>
                    {hotel.name}
                </h3>
                <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "8px" }}>
                    {hotel.address}<br />{hotel.location}
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                    <span style={{
                        backgroundColor: "#06b6d4",
                        color: "#fff",
                        padding: "2px 8px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontWeight: 600,
                    }}>
                        {hotel.rating}
                    </span>
                    <span style={{ fontSize: "13px", color: "#1f2937" }}>{hotel.ratingText}</span>
                    <span style={{ fontSize: "12px", color: "#6b7280" }}>({hotel.reviewCount} reviews)</span>
                </div>

                {/* Amenities */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {[
                        { icon: Car, label: "Self-parking" },
                        { icon: Wifi, label: "Free WiFi" },
                        { icon: Eye, label: "City view" },
                        { icon: Waves, label: "Full-service spa" },
                        { icon: Coffee, label: "2 restaurants" },
                    ].map((amenity, idx) => (
                        <div key={idx} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <amenity.icon size={14} color="#6b7280" />
                            <span style={{ fontSize: "13px", color: "#4b5563" }}>{amenity.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Reservation Info */}
            <div style={{ padding: "16px", borderBottom: "1px solid #f3f4f6" }}>
                <h4 style={{ fontSize: "15px", fontWeight: 600, color: "#1f2937", marginBottom: "8px" }}>
                    Your reservation information
                </h4>
                <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "8px" }}>
                    {hotel.address}<br />{hotel.location}
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                    <span style={{
                        backgroundColor: "#06b6d4",
                        color: "#fff",
                        padding: "2px 8px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontWeight: 600,
                    }}>
                        {hotel.rating}
                    </span>
                    <span style={{ fontSize: "13px", color: "#1f2937" }}>{hotel.ratingText}</span>
                    <span style={{ fontSize: "12px", color: "#6b7280" }}>({hotel.reviewCount} reviews)</span>
                </div>

                {/* Check-in/out */}
                <div style={{ display: "flex", gap: "24px", marginBottom: "16px" }}>
                    <div>
                        <div style={{ fontSize: "12px", color: "#6b7280" }}>Check-in</div>
                        <div style={{ fontSize: "14px", fontWeight: 600, color: "#1f2937" }}>{checkIn}</div>
                        <div style={{ fontSize: "11px", color: "#9ca3af" }}>The earliest is 15:00</div>
                    </div>
                    <div>
                        <div style={{ fontSize: "12px", color: "#6b7280" }}>Check-out</div>
                        <div style={{ fontSize: "14px", fontWeight: 600, color: "#1f2937" }}>{checkOut}</div>
                        <div style={{ fontSize: "11px", color: "#9ca3af" }}>Until 12:00 AM</div>
                    </div>
                </div>

                {/* Your choice */}
                <div>
                    <div style={{ fontSize: "12px", color: "#6b7280" }}>Your choice</div>
                    <div style={{ fontSize: "14px", fontWeight: 500, color: "#1f2937" }}>
                        {nights} nights for {adults} adults, 1 room
                    </div>
                    <div style={{ fontSize: "13px", color: "#4b5563" }}>1 x {room.name}</div>
                </div>
            </div>

            {/* Price Summary */}
            <div style={{ padding: "16px", borderBottom: "1px solid #f3f4f6" }}>
                <h4 style={{ fontSize: "15px", fontWeight: 600, color: "#1f2937", marginBottom: "12px" }}>
                    Your price summary
                </h4>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <span style={{ fontSize: "16px", fontWeight: 600, color: "#1f2937" }}>Total</span>
                    <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: "20px", fontWeight: 600, color: "#1f2937" }}>
                            ${room.totalPrice} total
                        </div>
                        <div style={{ fontSize: "12px", color: "#6b7280" }}>
                            +${taxesAndFees} taxes and fees
                        </div>
                    </div>
                </div>
            </div>

            {/* Cancellation Fee */}
            <div style={{ padding: "16px" }}>
                <h4 style={{ fontSize: "15px", fontWeight: 600, color: "#1f2937", marginBottom: "8px" }}>
                    How much is the cancellation fee?
                </h4>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "13px", color: "#6b7280" }}>
                        The amount you will pay if you cancel
                    </span>
                    <span style={{ fontSize: "16px", fontWeight: 600, color: "#1f2937" }}>
                        ${cancellationFee} total
                    </span>
                </div>
            </div>
        </div>
    );
}

// -----------------------------------------------------------------------------
// Main Page Component
// -----------------------------------------------------------------------------

function ReservationContent() {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [currentStep, setCurrentStep] = useState(2);

    // Form state
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        country: "",
        email: "",
        phone: "+994",
        bookingFor: "myself",
        specialRequests: "",
    });

    const hotelId = params.id as string;
    const roomId = searchParams.get("roomId") || "1";
    const hotel = SAMPLE_HOTELS.find(h => h.id === hotelId);
    const room = SAMPLE_ROOMS.find(r => r.id === roomId) || SAMPLE_ROOMS[0];

    const checkIn = searchParams.get("checkIn") || "Thu, Sep 18, 2025";
    const checkOut = searchParams.get("checkOut") || "Sun, Sep 21, 2025";
    const nights = 3;
    const adults = 2;

    if (!hotel) {
        return (
            <div style={{ padding: "100px", textAlign: "center" }}>
                <h1>Hotel not found</h1>
                <button onClick={() => router.push("/hotels")}>Back to Hotels</button>
            </div>
        );
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNext = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        } else {
            // Complete reservation
            alert("Reservation completed successfully! A confirmation email will be sent to " + formData.email);
            router.push("/hotels");
        }
    };

    const inputStyle: React.CSSProperties = {
        width: "100%",
        padding: "12px 16px",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        fontSize: "14px",
        outline: "none",
    };

    const labelStyle: React.CSSProperties = {
        fontSize: "14px",
        fontWeight: 500,
        color: "#1f2937",
        marginBottom: "6px",
        display: "block",
    };

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc", paddingTop: "72px" }}>
            <Header />

            {/* Step Indicator */}
            <StepIndicator currentStep={currentStep} />

            {/* Main Content */}
            <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px" }}>
                <div style={{ display: "flex", gap: "32px" }}>
                    {/* Form Section */}
                    <div style={{ flex: 1 }}>
                        <div style={{
                            backgroundColor: "#ffffff",
                            borderRadius: "12px",
                            border: "1px solid #e5e7eb",
                            padding: "24px",
                            marginBottom: "24px",
                        }}>
                            <h2 style={{ fontSize: "22px", fontWeight: 600, color: "#1f2937", marginBottom: "24px" }}>
                                Enter your information
                            </h2>

                            {/* Name Fields */}
                            <div style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
                                <div style={{ flex: 1 }}>
                                    <label style={labelStyle}>
                                        First name <span style={{ color: "#ef4444" }}>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        style={inputStyle}
                                        value={formData.firstName}
                                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                                        placeholder="John"
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={labelStyle}>
                                        Last name <span style={{ color: "#ef4444" }}>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        style={inputStyle}
                                        value={formData.lastName}
                                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>

                            {/* Country and Email */}
                            <div style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
                                <div style={{ flex: 1 }}>
                                    <label style={labelStyle}>
                                        Country/region <span style={{ color: "#ef4444" }}>*</span>
                                    </label>
                                    <div style={{ position: "relative" }}>
                                        <select
                                            style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
                                            value={formData.country}
                                            onChange={(e) => handleInputChange("country", e.target.value)}
                                        >
                                            <option value="">Select</option>
                                            {COUNTRIES.map(country => (
                                                <option key={country} value={country}>{country}</option>
                                            ))}
                                        </select>
                                        <ChevronDown
                                            size={16}
                                            color="#6b7280"
                                            style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
                                        />
                                    </div>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={labelStyle}>
                                        E-mail <span style={{ color: "#ef4444" }}>*</span>
                                    </label>
                                    <input
                                        type="email"
                                        style={inputStyle}
                                        value={formData.email}
                                        onChange={(e) => handleInputChange("email", e.target.value)}
                                        placeholder="example@gmail.com"
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div style={{ marginBottom: "24px", maxWidth: "300px" }}>
                                <label style={labelStyle}>
                                    Phone number <span style={{ color: "#ef4444" }}>*</span>
                                </label>
                                <input
                                    type="tel"
                                    style={inputStyle}
                                    value={formData.phone}
                                    onChange={(e) => handleInputChange("phone", e.target.value)}
                                    placeholder="+994"
                                />
                            </div>

                            {/* Booking For */}
                            <div style={{ marginBottom: "24px" }}>
                                <div style={{ fontSize: "14px", fontWeight: 500, color: "#1f2937", marginBottom: "12px" }}>
                                    Who are you booking for?
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                    <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                                        <input
                                            type="radio"
                                            name="bookingFor"
                                            checked={formData.bookingFor === "myself"}
                                            onChange={() => handleInputChange("bookingFor", "myself")}
                                        />
                                        <span style={{ fontSize: "14px", color: "#4b5563" }}>I'm the real guest</span>
                                    </label>
                                    <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                                        <input
                                            type="radio"
                                            name="bookingFor"
                                            checked={formData.bookingFor === "someone"}
                                            onChange={() => handleInputChange("bookingFor", "someone")}
                                        />
                                        <span style={{ fontSize: "14px", color: "#4b5563" }}>Booking on behalf of someone else</span>
                                    </label>
                                </div>
                                <a href="#" style={{ fontSize: "13px", color: "#06b6d4", marginTop: "8px", display: "block" }}>
                                    Add main guest information
                                </a>
                            </div>
                        </div>

                        {/* Special Requests */}
                        <div style={{
                            backgroundColor: "#ffffff",
                            borderRadius: "12px",
                            border: "1px solid #e5e7eb",
                            padding: "24px",
                            marginBottom: "24px",
                        }}>
                            <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#1f2937", marginBottom: "12px" }}>
                                Special Requests/Notes
                            </h3>
                            <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "16px", lineHeight: 1.6 }}>
                                Special requests cannot be guaranteed, but the property will do its best to accommodate your needs.
                                You can submit a special request at any time after your reservation is complete!
                            </p>
                            <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "12px" }}>
                                Please write your requests in English.
                            </p>
                            <textarea
                                style={{
                                    ...inputStyle,
                                    minHeight: "100px",
                                    resize: "vertical",
                                }}
                                value={formData.specialRequests}
                                onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                                placeholder="Any special requests..."
                            />
                        </div>

                        {/* Next Button */}
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <button
                                onClick={handleNext}
                                style={{
                                    backgroundColor: "#06b6d4",
                                    color: "#ffffff",
                                    border: "none",
                                    borderRadius: "8px",
                                    padding: "14px 48px",
                                    fontSize: "16px",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                }}
                            >
                                {currentStep === 3 ? "Complete Reservation" : "Next"}
                            </button>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div style={{ width: "360px" }}>
                        <ReservationSidebar
                            hotel={hotel}
                            room={room}
                            checkIn={checkIn}
                            checkOut={checkOut}
                            nights={nights}
                            adults={adults}
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default function HotelReservationPage() {
    return (
        <Suspense fallback={<div style={{ padding: "40px", textAlign: "center" }}>Loading...</div>}>
            <ReservationContent />
        </Suspense>
    );
}
