
import * as admin from 'firebase-admin';
import * as fs from 'fs';
const filePath = './src/helpers/talresume.json';
const fileContents = fs.readFileSync(filePath, 'utf8');
const jsonData = JSON.parse(fileContents);


admin.initializeApp({
  credential: admin.credential.cert(jsonData)
  }); 

export const firestore = admin.firestore();
export const findorcreateuser = async (userdetails: any): Promise<any> => {
    const userRef = firestore.collection('tal_db').doc(userdetails.email);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
        await userRef.set(userdetails);
        var newData =  await userRef.get();
        // console.log(newData.data());
        
        console.log('User stored in Firestore:', userdetails.email);
        return newData.data()
    } else {
        // console.log(snapshot.data());
        
        console.log('User already exists in Firestore:', userdetails.email);
        return snapshot.data()
    }
}

export const getmyresumeid = async (user_id: string , email : string) => {
        var docRef = await firestore.collection('tal_db').doc(email);
        var doc = await docRef.get();
        if(doc.data().user_id == user_id && doc.data().resume_id !== null) {
            return ({
                resume_id : doc.data().resume_id,
                folder_id : doc.data().resume_folder_id 
            })
        }else{
            return null
        }
}


export const updateresumedetails = async ( filename ,email) =>{
    const docRef = firestore.collection('tal_db').doc(email);
    const updateData = {
        resume_id : filename
    };
    docRef.update(updateData)
    .then(() => {
        console.log("Document successfully updated!");
    })
    .catch((error) => {
        console.error("Error updating document: ", error);
    });
}