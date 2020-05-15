import { DATASET_DETAILS_ACTIVE, DATASET_DETAILS_NONACTIVE, DATASET_ANALYZE_NONACTIVE, DATASET_ANALYZE_ACTIVE } from '../types.js';
import { COLLECTORS_TEAM_ACTIVE, COLLECTORS_TEAM_NONACTIVE, LABELS_SECTION_ACTIVE, LABELS_SECTION_NONACTIVE, ITEMS_SECTION_ACTIVE, ITEMS_SECTION_NONACTIVE, ADD_ITEM_ACTIVE,ADD_LABEL_ACTIVE , ADD_LABEL_NONACTIVE, ADD_ITEM_NONACTIVE } from "../types";
import { DATASET_STATICS_ACTIVE, DATASET_STATICS_NONACTIVE, DATASET_CONTRIBUTIONS_ACTIVE, DATASET_CONTRIBUTIONS_NONACTIVE, LABEL_DISTRIBUTION_ACTIVE, LABEL_DISTRIBUTION_NONACTIVE, DATE_UPLOAD_GRAPH_ACTIVE, DATE_UPLOAD_GRAPH_NONACTIVE, DATASET_MODELS_GRAPH_ACTIVE, DATASET_MODELS_GRAPH_NONACTIVE} from "../types";


/****************************************
 * toggle dataset sections
 ***************************************/
export const activateSection = (section) => dispatch => {
    dispatch({ 
        type: activate_map_actiontype(section),
        payload: null  
    });
}
export const hideSection = (section) => dispatch => {
    dispatch({ 
        type: hide_map_actiontype(section),
        payload: null  
    });
}
export const activate_map_actiontype = (section) => {
    switch(section) {
        case 'General Details':
            return DATASET_DETAILS_ACTIVE;
        case 'Collectors Team':
            return COLLECTORS_TEAM_ACTIVE;
        case 'Labels Section':
            return LABELS_SECTION_ACTIVE;
        case 'Items Section':
            return ITEMS_SECTION_ACTIVE;
        case 'Add Label':
            return ADD_LABEL_ACTIVE;
        case 'Add Item':
            return ADD_ITEM_ACTIVE;
        case 'Dataset Analysis':
            return DATASET_ANALYZE_ACTIVE
        case 'Statics':
            return DATASET_STATICS_ACTIVE
        case 'Team Contributions':
            return DATASET_CONTRIBUTIONS_ACTIVE
        case 'Labels Distrubution':
            return LABEL_DISTRIBUTION_ACTIVE
        case 'Date Distribution':
            return DATE_UPLOAD_GRAPH_ACTIVE
        case 'Models Results':
            return DATASET_MODELS_GRAPH_ACTIVE
        default:
            return '';
    }
}

export const hide_map_actiontype = (section) => {
    console.log(section);
    switch(section) {
        case 'General Details':
            return DATASET_DETAILS_NONACTIVE;
        case 'Collectors Team':
            return COLLECTORS_TEAM_NONACTIVE;
        case 'Labels Section':
            return LABELS_SECTION_NONACTIVE;
        case 'Items Section':
            return ITEMS_SECTION_NONACTIVE;
        case 'Add Label':
            return ADD_LABEL_NONACTIVE;
        case 'Add Item':
            return ADD_ITEM_NONACTIVE;
        case 'Dataset Analysis':
            return DATASET_ANALYZE_NONACTIVE
        case 'Statics':
            return DATASET_STATICS_NONACTIVE
        case 'Team Contributions':
            return DATASET_CONTRIBUTIONS_NONACTIVE
        case 'Labels Distrubution':
            return LABEL_DISTRIBUTION_NONACTIVE
        case 'Date Distribution':
            return DATE_UPLOAD_GRAPH_NONACTIVE
        case 'Models Results':
            return DATASET_MODELS_GRAPH_NONACTIVE
        default:
            return '';
    }
}