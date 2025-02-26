export interface CommonProcessState {
  isLoading: boolean;
  isSuccess: boolean;
  error: any;
}

export const initProcessState: CommonProcessState = {
  isLoading: false,
  isSuccess: false,
  error: null
};
