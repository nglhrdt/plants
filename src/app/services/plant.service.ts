import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  DocumentData,
  DocumentReference,
  Firestore,
  FirestoreDataConverter,
  query,
  QueryDocumentSnapshot,
  serverTimestamp,
  Timestamp,
  where,
} from '@angular/fire/firestore';
import { FieldValue, orderBy } from '@firebase/firestore';
import { Observable } from 'rxjs';

export interface NewPlantData {
  species: string;
  plantDate: Date;
}

export class Plant {
  constructor(public readonly id: string, public readonly species: string, public readonly plantDate: Date) {}
}

const PLANTS_COLLECTION_NAME = 'plants';

@Injectable({
  providedIn: 'root',
})
export class PlantService {
  constructor(private firestore: Firestore, private auth: Auth) {}

  getPlants$(): Observable<Plant[]> {
    const plantsCollection = collection(this.firestore, PLANTS_COLLECTION_NAME).withConverter(plantConverter);
    return collectionData(query(plantsCollection, where('userId', '==', this.auth.currentUser?.uid), orderBy('plantDate', 'desc')), { idField: 'id' });
  }

  getPlantById$(plantId: string): Observable<Plant> {
    return docData(doc(this.firestore, `${PLANTS_COLLECTION_NAME}/${plantId}`).withConverter(plantConverter), { idField: 'id' });
  }

  createPlant(newPlantData: NewPlantData): Promise<string> {
    const data = {
      species: newPlantData.species,
      plantDate: newPlantData.plantDate,
      userId: this.auth.currentUser?.uid,
      createdAt: serverTimestamp(),
    };

    return addDoc(collection(this.firestore, PLANTS_COLLECTION_NAME), data).then(ref => ref.id);
  }

  deletePlant(plant: Plant): Promise<void> {
    return deleteDoc(doc(this.firestore, `${PLANTS_COLLECTION_NAME}/${plant.id}`));
  }
}

const plantConverter: FirestoreDataConverter<Plant> = {
  toFirestore(plant: Plant): DocumentData {
    return { ...plant };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<{ id: string; species: string; plantDate: Timestamp }>): Plant {
    const data = snapshot.data();
    return new Plant(data.id, data.species, data.plantDate.toDate());
  },
};
