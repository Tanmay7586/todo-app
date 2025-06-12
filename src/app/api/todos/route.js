import admin from '@/lib/firebaseAdmin';

export async function GET(request) {
  const token = request.headers.get('authorization')?.split(' ')[1];
  
  if (!token) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const userId = decodedToken.uid;
    
    const snapshot = await admin.firestore()
      .collection('todos')
      .where('userId', '==', userId)
      .get();
    
    const tasks = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return Response.json(tasks);
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Invalid token' }, { status: 401 });
  }
}

export async function POST(request) {
  const token = request.headers.get('authorization')?.split(' ')[1];
  
  if (!token) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const userId = decodedToken.uid;
    const body = await request.json();
    
    const newTask = {
      ...body,
      userId,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      status: 'Active'
    };
    
    const docRef = await admin.firestore().collection('todos').add(newTask);
    return Response.json({ id: docRef.id, ...newTask }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Invalid token' }, { status: 401 });
  }
}