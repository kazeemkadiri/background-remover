// tests/teardown.s
export default async () => {
  // If you stored a global reference to your server or DB
  if ((global as any).__SERVER__) {
    await (global as any).__SERVER__.close();
  }
  
  // Example for Mongoose/MongoDB
  // await mongoose.connection.close();
  
  console.log('\nGlobal teardown complete: All handles closed.');
};