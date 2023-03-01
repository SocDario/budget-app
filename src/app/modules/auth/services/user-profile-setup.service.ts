import { Injectable } from '@angular/core';
import { forkJoin, take, tap } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Category } from '../../transaction/models';
import { CategoryActionsService } from '../../transaction/services/category-actions.service';

@Injectable({
  providedIn: 'root',
})
export class UserProfileSetupService {
  userProfileSettings = this.firestore.collection('userProfileSettings');
  expenseCategories = this.firestore.collection<Category>('expenseCategories');
  incomeCategories = this.firestore.collection<Category>('incomeCategories');

  constructor(
    private readonly firestore: AngularFirestore,
    private readonly categoryActionService: CategoryActionsService
  ) {}

  createUserProfileGroups(userId: string) {
    const userProfileRef = this.userProfileSettings.doc(userId).ref;
    const expenseCategoriesRef = userProfileRef.collection('expenseCategories');
    const incomeCategoriesRef = userProfileRef.collection('incomeCategories');

    return forkJoin([
      this.categoryActionService.getCategories('expense').pipe(take(1)),
      this.categoryActionService.getCategories('income').pipe(take(1)),
    ]).pipe(
      tap(([expenseCategoryData, incomeCategoryData]) => {
        expenseCategoryData.map((category) =>
          expenseCategoriesRef.add(category)
        );
        incomeCategoryData.map((category) => incomeCategoriesRef.add(category));
      })
    );
  }
}
