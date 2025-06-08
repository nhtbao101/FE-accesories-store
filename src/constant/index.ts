//redux const
export const defaultInitialState: {
  isLoading: boolean;
  isSuccess: boolean;
  data: any;
  error: any;
} = {
  isLoading: false,
  isSuccess: false,
  data: null,
  error: null
};

export enum UserType {
  admin = 1,
  user
}
