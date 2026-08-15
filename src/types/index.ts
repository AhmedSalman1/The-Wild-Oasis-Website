import type {
	Tables,
	TablesInsert,
	TablesUpdate,
} from "@/types/database.types";

export type Cabin = Tables<"cabins">;
export type Booking = Tables<"bookings">;
export type Guest = Tables<"guests">;
export type Settings = Tables<"settings">;

export type NewGuest = TablesInsert<"guests">;
export type NewBooking = TablesInsert<"bookings">;

export type GuestUpdate = TablesUpdate<"guests">;
export type BookingUpdate = TablesUpdate<"bookings">;

export type CabinPrice = Pick<Cabin, "regularPrice" | "discount">;
export type CabinSummary = Pick<
	Cabin,
	"id" | "name" | "maxCapacity" | "regularPrice" | "discount" | "image"
>;

export type GuestBooking = Booking & {
	cabins: Pick<Cabin, "name" | "image"> | null;
};
