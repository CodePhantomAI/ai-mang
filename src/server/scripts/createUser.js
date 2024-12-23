import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { Organization } from '../models/Organization.js';

async function createUserWithOrganization() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/your-database');

    // Create organization
    const organization = new Organization({
      name: 'Default Organization',
      email: 'jannaskgdes@hotmail.com',
    });
    await organization.save();

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('123123123', salt);

    // Create user
    const user = new User({
      organizationId: organization._id,
      firstName: 'Default',
      lastName: 'User',
      email: 'jannaskgdes@hotmail.com',
      password: hashedPassword,
      role: 'admin',
      isActive: true,
      emailVerified: true
    });
    await user.save();

    console.log('User and organization created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

createUserWithOrganization();
