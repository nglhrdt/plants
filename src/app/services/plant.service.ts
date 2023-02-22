import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  addDoc,
  collection,
  collectionData,
  DocumentData,
  DocumentReference,
  Firestore,
  FirestoreDataConverter,
  query,
  QueryDocumentSnapshot,
  serverTimestamp,
  Timestamp,
} from '@angular/fire/firestore';
import { orderBy } from '@firebase/firestore';
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
    return collectionData(query(plantsCollection, orderBy('plantDate', 'desc')), { idField: 'id' });
  }

  createPlant(newPlantData: NewPlantData): Promise<DocumentReference> {
    const data = {
      species: newPlantData.species,
      plantDate: newPlantData.plantDate,
      userId: this.auth.currentUser?.uid,
      createdAt: serverTimestamp(),
    };

    return addDoc(collection(this.firestore, PLANTS_COLLECTION_NAME), data);
  }
}

export const plantConverter: FirestoreDataConverter<Plant> = {
  toFirestore(plant: Plant): DocumentData {
    return { ...plant };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<{ id: string; species: string; plantDate: Timestamp }>): Plant {
    const data = snapshot.data();
    return new Plant(data.id, data.species, data.plantDate.toDate());
  },
};
