import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
      isModalOpen: false,
      uploadingStatus: {
        uploaded: 0,
        totalFiles: 0,
      },
  
      // stem separation audio cards in studio
      stemSeparationFilter: 'Stem Separation',
    },
    reducers: {
      setIsDeleteProjectModalOpen(state, action) {
        const newState = {
          ...state,
          isDeleteProjectModalOpen: action.payload.value,
        };
        return newState;
      },
      setDownloadingColumn(state, action) {
        const newState = {
          ...state,
          downloadingColumn: action.payload.data,
        };
        return newState;
      },
      setIsRecordingUploading(state, action) {
        const newState = {
          ...state,
          isRecordingUploading: action.payload.value,
        };
        return newState;
      },
    },
  });

export const uiActions = uiSlice.actions;
export default uiSlice;