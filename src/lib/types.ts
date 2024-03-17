import { ListState, ModelState } from "./abs_types"

export type Paper = {
  arxiv_id: string
  title: string
  abstract: string

  project_name?: string
}

export type Project = {
  name: string
  papers: Paper[]
}

export type AppState = {
  projectList: ListState<Project>
  projectModel: ModelState<Project>
  paperModel: ModelState<Paper>
}