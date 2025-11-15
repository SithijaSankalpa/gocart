const { default: prisma } = require("@/lib/prisma")

const authSeller = async (userId) => {
  try {
    // Add check for userId
    if (!userId) {
      return false
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { store: true },
    })

    // Check if user exists
    if (!user) {
      return false
    }

    // Check if user has a store and it's approved
    if (user.store && user.store.status === 'approved') {
      return user.store.id
    }
    
    return false // Return false if store doesn't exist or not approved
    
  } catch (error) {
    console.error(error);
    return false
  }
}

export default authSeller