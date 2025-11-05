import imageKit from "@/configs/imageKit";
import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Create a new store
export async function POST(request) {
  try{
    const { userId } = getAuth(request)
    // Get the data from the form
    const formData = await request.formData()
    const name = formData.get("name")
    const userName = formData.get("username")
    const description = formData.get("description")
    const email = formData.get("email")
    const contact = formData.get("contact")
    const address = formData.get("address")
    const image = formData.get("image")

    if(!name || !userName || !description || !email || !contact || !address || !image){
      return NextResponse.json({error: "All fields are required"}, {status: 400})
    }

    // Check is user have already registered a store
    const store = await prisma.store.findFirst({
      where: { userId: userId }
    })

    // If store is already registered then send status of store
    if(store){
      return NextResponse.json({ status: store.status})
    }

    // Check is username is already taken
    const isUserNameTaken = await prisma.store.findFirst({
      where: { username: userName.toLowerCase() }
    })

    if(isUserNameTaken){
      return NextResponse.json({ error: "Username is already taken" }, { status: 400 })
    }

    // Image upload to imagekit
    const buffer = Buffer.from(await image.arrayBuffer());
    const response = await imageKit.upload({
      file : buffer,
      fileName : image.name,
      folder: "logos"
    })

    const optimizedImage = imageKit.url({
      path : response.filePath,
      transformation : [
        {quality: 'auto' },
        { format: 'webp' },
        { height: '512' }
      ]
    })
    
    const newStore = await prisma.store.create({
      data: {
        userId,
        name,
        description,
        username: userName.toLowerCase(),
        email,
        contact,
        address,
        logo: optimizedImage
      }
    })

    // Link store to user
    await prisma.user.update({
      where: { id: userId },
      data: { store: {connect: {id: newStore.id}}}
    })

    return NextResponse.json({ message: "Applied, waiting for approval" })

  } catch (error) {
    console.error(error);
    return NextResponse.json({error: error.code || error.message}, {status: 400})
  }
}

// Check is user have already registered a store if yes then return status of store
export async function GET(request) {
  try {
    const { userId } = getAuth(request)
    // Check is user have already registered a store
    const store = await prisma.store.findFirst({
      where: { userId: userId }
    })

    // If store is already registered then send status of store
    if(store){
      return NextResponse.json({ status: store.status})
    }
    return NextResponse.json({ status: "not-registered" })

  } catch (error) {
    console.error(error);
    return NextResponse.json({error: error.code || error.message}, {status: 400})
  }
}