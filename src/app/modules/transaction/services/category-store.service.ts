import { Injectable } from '@angular/core';
import { catchError, from, tap } from 'rxjs';
import { Store } from '../../shared/classes/store.class';
import { UtilsService } from '../../shared/services/utils.service';
import { Category, CategoryType } from '../models';
import { CategoryActionsService } from './category-actions.service';

interface TransactionCategoryStore {
  categories: Category[];
  isLoadingCategories: boolean;
  categoriesError: string;
  isLoadingCreateCategory: boolean;
  createCategoryError: string;
  isLoadingUpdateCategory: boolean;
  updateCategoryError: string;
  isLoadingDeleteCategory: boolean;
  deleteCategoryError: string;
}

const initialValues: TransactionCategoryStore = {
  categories: [],
  isLoadingCategories: false,
  categoriesError: '',
  isLoadingCreateCategory: false,
  createCategoryError: '',
  isLoadingUpdateCategory: false,
  updateCategoryError: '',
  isLoadingDeleteCategory: false,
  deleteCategoryError: '',
};

@Injectable({
  providedIn: 'root',
})
export class CategoryStoreService extends Store<TransactionCategoryStore> {
  categories$ = this.select((state) => state.categories);
  isLoadingCategories$ = this.select((state) => state.isLoadingCategories);
  categoriesError$ = this.select((state) => state.categoriesError);

  isLoadingCreateCategory$ = this.select(
    (state) => state.isLoadingCreateCategory
  );
  createCategoryError$ = this.select((state) => state.createCategoryError);

  isLoadingUpdateCategory$ = this.select(
    (state) => state.isLoadingUpdateCategory
  );
  updateCategoryError$ = this.select((state) => state.updateCategoryError);

  isLoadingDeleteCategory$ = this.select(
    (state) => state.isLoadingDeleteCategory
  );
  deleteCategoryError$ = this.select((state) => state.deleteCategoryError);

  constructor(
    private readonly categoryActionsService: CategoryActionsService,
    private readonly utilsService: UtilsService
  ) {
    super(initialValues);
  }

  getCategories(categoryType: CategoryType) {
    this.setState({
      isLoadingCategories: true,
    });
    return this.categoryActionsService.getUserCategories(categoryType).pipe(
      tap((category) => {
        this.setState({
          categories: category,
          isLoadingCategories: false,
        }),
          catchError((error) => {
            this.setState({
              isLoadingCategories: false,
            });
            return this.utilsService.handleError(error);
          });
      })
    );
  }

  createCategory(categoryType: CategoryType, category: Category) {
    this.setState({
      isLoadingCreateCategory: true,
    });
    return from(
      this.categoryActionsService.createUserCategory(categoryType, category)
    ).pipe(
      tap(() => {
        this.setState({
          isLoadingCreateCategory: false,
        });
        this.utilsService.handleShowSnackbar('Category successfully created');
      }),
      catchError((error) => {
        this.setState({
          isLoadingCreateCategory: false,
        });
        return this.utilsService.handleError(error);
      })
    );
  }

  updateCategory(
    categoryType: CategoryType,
    category: Category,
    categoryId: string
  ) {
    this.setState({
      isLoadingUpdateCategory: true,
    });
    return from(
      this.categoryActionsService.updateUserCategory(
        categoryType,
        category,
        categoryId
      )
    ).pipe(
      tap(() => {
        this.setState({
          isLoadingUpdateCategory: false,
        });
        this.utilsService.handleShowSnackbar('Category successfully updated');
      }),
      catchError((error) => {
        this.setState({
          isLoadingUpdateCategory: false,
        });
        return this.utilsService.handleError(error);
      })
    );
  }

  deleteCategory(categoryType: CategoryType, categoryId: string) {
    this.setState({
      isLoadingDeleteCategory: true,
    });
    return from(
      this.categoryActionsService.deleteUserCategory(categoryType, categoryId)
    ).pipe(
      tap(() => {
        this.setState({
          isLoadingDeleteCategory: false,
        });
        this.utilsService.handleShowSnackbar('Category successfully deleted');
      }),
      catchError((error) => {
        this.setState({
          isLoadingDeleteCategory: false,
        });
        return this.utilsService.handleError(error);
      })
    );
  }
}
