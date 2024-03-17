import { ListState, ModelState } from "./abs_types"

export type Paper = {
  arxiv_id: number
  title: string
  abstract: string
}

export type Project = {
  id: number
  name: string
  papers: Paper[]
}

export type AppState = {
  projectList: ListState<Project>
  projectModel: ModelState<Project>
}