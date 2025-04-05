import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import UserModel from "@/model/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function DELETE(
  request: Request,
  context: { params: { messageid: string } }
) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json(
      { success: false, message: "Not authenticated" },
      { status: 401 }
    );
  }

  const { messageid } = context.params;

  try {
    const userId = session.user._id;
    const updatedResult = await UserModel.updateOne(
      { _id: userId },
      { $pull: { messages: { _id: messageid } } }
    );

    if (updatedResult.modifiedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Message not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Message deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to delete user message:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete user message" },
      { status: 500 }
    );
  }
}
