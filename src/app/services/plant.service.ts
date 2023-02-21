import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  addDoc,
  collection,
  DocumentData,
  DocumentReference,
  Firestore,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  serverTimestamp,
  SnapshotOptions,
} from '@angular/fire/firestore';

export class Plant {
  constructor(public readonly id: string, public readonly species: string) {}
}

@Injectable({
  providedIn: 'root',
})
export class PlantService {
  constructor(private firestore: Firestore, private auth: Auth) {}

  createPlant(species: string): Promise<DocumentReference> {
    const data = {
      species,
      userId: this.auth.currentUser?.uid,
      createdAt: serverTimestamp(),
    };

    return addDoc(collection(this.firestore, 'plants'), data);
  }
}

export const plantConverter: FirestoreDataConverter<Plant> = {
  toFirestore(plant: Plant): DocumentData {
    return { ...plant };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<Plant>, options: SnapshotOptions): Plant {
    const data = snapshot.data(options)!;
    return new Plant(data.id, data.species);
  },
};
