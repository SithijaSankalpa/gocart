import prisma from "@/lib/prisma";
import { getAuth} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Verify coupon
export async function POST(request) {
  try {
    const { userId, has } = getAuth(request)
    const { code } = await request.json()

    // First, find the coupon by code
    const coupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase() }
    })

    // Check if coupon exists
    if (!coupon) {
      return NextResponse.json({ error: "Coupon not found" }, { status: 404 })
    }

    // Check if coupon is expired
    if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
      return NextResponse.json({ error: "Coupon has expired" }, { status: 400 })
    }

    // Check if coupon is for new users only
    if (coupon.forNewUser) {
      const userOrders = await prisma.order.findMany({ 
        where: { userId } 
      })

      if (userOrders.length > 0) {
        return NextResponse.json({ error: "Coupon valid for new users only" }, { status: 400 })
      }
    }

    // Check if coupon is for members only
    if (coupon.forMember) {
      const hasPlusPlan = has({ plan: 'plus' })
      if (!hasPlusPlan) {
        return NextResponse.json({ error: "Coupon valid for members only" }, { status: 400 })
      }
    }

    return NextResponse.json({ coupon })
    
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.code || error.message }, { status: 400 })
  }
}