import { ErrorObject, ForumSection } from '@/types/types'

export interface State {
  sectionData: {
    error: ErrorObject | null
    isLoading: boolean
    sections: ForumSection[]
    selectedSection: ForumSection | null
  }
}
