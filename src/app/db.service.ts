import { Injectable } from '@angular/core';
import {
  Stitch,
  RemoteMongoClient,
  AnonymousCredential,
  RemoteMongoDatabase,
  StitchAppClient
} from 'mongodb-stitch-browser-sdk';

@Injectable({ providedIn: 'root' })
export class DBService {
  db: RemoteMongoDatabase;
  client: StitchAppClient;

  initDB() {
    this.client = Stitch.initializeDefaultAppClient('ng-database-demo-cvvla');

    this.db = this.client
      .getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas')
      .db('ng-db');
  }

  addTodo(todo: { title: string }) {
    this.client.auth.loginWithCredential(new AnonymousCredential()).then(() => {
      this.db.collection('todos').insertOne(todo);
    });
  }

  getTodos() {
    return this.client.auth
      .loginWithCredential(new AnonymousCredential())
      .then(() => {
        return this.db
          .collection<{ title: string }>('todos')
          .find()
          .asArray();
      });
  }
}
