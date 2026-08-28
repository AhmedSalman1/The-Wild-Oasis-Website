import { NextRequest } from "next/server";
import { getBookedDatesByCabinId, getCabin } from "@/lib/data-service";

interface RouteParams {
	params: Promise<{
		cabinId: string;
	}>;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
	const { cabinId } = await params;

	try {
		const [cabin, bookedDates] = await Promise.all([
			getCabin(cabinId),
			getBookedDatesByCabinId(cabinId),
		]);

		if (!cabin) {
			return Response.json({ message: "Cabin not found" }, { status: 404 });
		}

		return Response.json({ cabin, bookedDates });
	} catch {
		return Response.json(
			{ message: "An unexpected error occurred" },
			{ status: 500 }
		);
	}
}

// export async function POST() {}
