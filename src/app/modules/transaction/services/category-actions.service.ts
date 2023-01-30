import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { AuthStoreService } from '../../auth/services/auth-store.service';
import { Category, CategoryType } from '../models/Category';

enum CategoryCollection {
  ExpenseCategories = 'expenseCategories',
  IncomeCategories = 'incomeCategories',
}

enum UserSettingsCollection {
  UserProfileSettings = 'userProfileSettings',
}

@Injectable({
  providedIn: 'root',
})
export class CategoryActionsService {
  userId?: string;
  userSettingsCollection: AngularFirestoreDocument;

  constructor(
    private readonly firestore: AngularFirestore,
    private readonly authStoreSerivce: AuthStoreService
  ) {
    this.userId = this.authStoreSerivce.userId;
    this.userSettingsCollection = this.firestore
      .collection(UserSettingsCollection.UserProfileSettings)
      .doc(this.userId);
  }

  resolveUserCategoryCollection(categoryType: CategoryType) {
    if (categoryType === 'income') {
      return this.userSettingsCollection.collection<Category>(
        CategoryCollection.IncomeCategories
      );
    }
    return this.userSettingsCollection.collection<Category>(
      CategoryCollection.ExpenseCategories
    );
  }

  getCategories(categoryType: CategoryType) {
    if (categoryType === 'income') {
      return this.firestore
        .collection<Category>(CategoryCollection.IncomeCategories)
        .valueChanges();
    }
    return this.firestore
      .collection<Category>(CategoryCollection.ExpenseCategories)
      .valueChanges();
  }

  getUserCategories(categoryType: CategoryType) {
    return this.resolveUserCategoryCollection(categoryType).valueChanges({
      idField: 'id',
    });
  }

  createUserCategory(categoryType: CategoryType, category: Category) {
    return this.resolveUserCategoryCollection(categoryType).add(category);
  }

  updateUserCategory(
    categoryType: CategoryType,
    category: Category,
    categoryId: string
  ) {
    return this.resolveUserCategoryCollection(categoryType)
      .doc(categoryId)
      .update(category);
  }

  deleteUserCategory(categoryType: CategoryType, categoryId: string) {
    return this.resolveUserCategoryCollection(categoryType)
      .doc(categoryId)
      .delete();
  }
}
