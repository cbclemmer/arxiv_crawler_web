export type ListState<DT> = {
  loading: boolean
  items: DT[]
}

export type Project = {
  id: number
  name: string
}

export type AppState = {
  projectList: ListState<Project>
}

export interface Action<T, C, P> {
  type: T,
  component: C,
  payload: P
}

export type ActionList = {
  [K: string]: Action<string, string, any>
}