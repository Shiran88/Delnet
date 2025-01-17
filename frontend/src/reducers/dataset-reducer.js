import { GET_USER_DATASETS, CREATE_DATASET, DELETE_DATASET, SELECT_DATASET, GET_DATASET_TEAM, ADD_ITEM, ADD_LABEL, DELETE_LABEL, DATASET_ANALYZE_ACTIVE, DATASET_ANALYZE_NONACTIVE, GET_DATASET_ANALYSIS, DATASET_STATICS_ACTIVE, DATASET_STATICS_NONACTIVE, DATASET_CONTRIBUTIONS_ACTIVE, DATASET_CONTRIBUTIONS_NONACTIVE, DATASET_MODELS_GRAPH_ACTIVE, DATASET_MODELS_GRAPH_NONACTIVE, DATE_UPLOAD_GRAPH_ACTIVE, DATE_UPLOAD_GRAPH_NONACTIVE, GET_DATE_DISTRIBUTION, GET_USER_CONTRIBUTION, GET_DATASET_PROJECTS_PERFORMANCE, GET_UNLABLED_SMAPLES, GET_DATASET_OFFERS, GET_DATASETS_PUBLIC, GET_SEARCH_DATASETS, OFFER_ITEMS_ACTIVE, OFFER_ITEMS_NONACTIVE, TAG_SAMPELS_ACTIVE, TAG_SAMPLES_NONACTIVE, DATASET_ADD_NOTIFICATION_ACTIVE, DATASET_ADD_NOTIFICATION_NONACTIVE, NOTIFICATION_DATASET_ACTIVE, NOTIFICATION_DATASET_NONACTIVE, GET_USER_FOLLOWING_DATASETS, GET_SELECTED_LABELS, GET_ITEM_HIDE, GET_ITEM_ACTIVATE, GET_DATASET_HEADER, ADD_DATASET_MEMBER, DELETE_DATASET_MEMBER } from '../actions/types.js';
import { GET_ITEMS_COUNT, GET_DATASETS_ITEMS_AMOUNT, DATASET_DETAILS_ACTIVE, DATASET_DETAILS_NONACTIVE, GET_LABELS_COUNT, GET_DATASET_LABELS, GET_DATA_ITEMS, DELETE_DATA_ITEM } from '../actions/types.js';
import { UPDATE_DATASET,ADD_NOTIFICTION_DATASET, GET_NOTIFICATION_DATASET,COLLECTORS_TEAM_ACTIVE, COLLECTORS_TEAM_NONACTIVE, LABELS_SECTION_ACTIVE, LABELS_SECTION_NONACTIVE, ITEMS_SECTION_ACTIVE, ITEMS_SECTION_NONACTIVE, ADD_ITEM_ACTIVE,ADD_LABEL_ACTIVE , ADD_LABEL_NONACTIVE, ADD_ITEM_NONACTIVE, LABEL_DISTRIBUTION_ACTIVE, LABEL_DISTRIBUTION_NONACTIVE } from "../actions/types.js";
import { bindActionCreators } from 'redux';


const initialState = {
    user_datasets: null,
    notifications: null,
    following_datasets: null,
    dataset_selected: {
        id: window.localStorage.getItem('dataset-id'),
        name: window.localStorage.getItem('dataset-name'),
        description: window.localStorage.getItem('description'),
        create_date: window.localStorage.getItem('dataset-create-date'),
        user: window.localStorage.getItem('dataset-user'),
        premissions: window.localStorage.getItem('dataset-premissions'),
        public_view: window.localStorage.getItem("dataset-public-view"),
        enable_offer: window.localStorage.getItem("dataset-enable-offer"),
        team: null,
        labels: null,
        labels_quantity: null,
        pages: -1,
        items: [],
        analysis: null,
        offers: null,
        unlabeled: null,
        header: null,
    },
    user_contribution: null,
    date_distribution: null,
    dataset_projects: null,
    search_datasets: null,
    public_datasets: null,
    selected_labels: null
}
const toggleInitialState = {
    dataset_display: {
        dataset_details: false,
        collectors_team: false,
        labels_section: true,
        items_section: true, 
        add_label: false,
        add_item: false,
        analyze: false,
        statics: false,
        user_contributions: false,
        date_distribution: false,
        label_distribution: false,
        dataset_projects: false,
        offer_items: false,
        tag_samples: false,
        add_notification: false,
        notifications: false,
        get_item: null
    }
}
export function datasetsReducer(state = initialState, action) {
    switch(action.type) {
        case GET_NOTIFICATION_DATASET:
            return {
                ...state,
                notifications: action.payload
            }
        case GET_DATASET_HEADER:
            return {
                ...state,
                dataset_selected: {
                    ...state.dataset_selected,
                    header: action.payload
                }
            }
        case UPDATE_DATASET:
            window.localStorage.setItem('description',action.payload.description)
            window.localStorage.setItem('name',action.payload.name)
            return {
                ...state,
                dataset_selected: {
                    ...state.dataset_selected,
                    description: action.payload.description,
                    name: action.payload.name
                }
            }   
        case GET_USER_DATASETS: 
            return {
                ...state,
                user_datasets: action.payload
            }
        case GET_SELECTED_LABELS:
            return {
                ...state,
                selected_labels: action.payload
            }
        case GET_DATASET_TEAM:
            return {
                ...state,
                dataset_selected: {
                    ...state.dataset_selected,
                    team: action.payload,
                    team_size: action.payload.length
                }
            }
        case GET_DATA_ITEMS:
            let new_state =  {
                ...state,
                dataset_selected: {
                    ...state.dataset_selected,
                    pages: action.payload.count,
                }
            }
            new_state.dataset_selected.items[action.payload.page] = action.payload.results;
            return new_state
        case GET_DATASET_LABELS:
            return {
                ...state,
                dataset_selected: {
                    ...state.dataset_selected,
                    labels: action.payload,
                    labels_quantity: action.payload.length
                }
            }  
        case GET_DATASETS_ITEMS_AMOUNT:
            return {
                ...state,
                datasets_items_quantity: action.payload   
            }
        case GET_USER_FOLLOWING_DATASETS:
            return {
                ...state,
                following_datasets: action.payload
            }
        case GET_LABELS_COUNT:
            return {
                ...state,
                dataset_selected: {
                    ...state.dataset_selected,
                    labels_quantity: action.payload.count
                }
            }
        case GET_ITEMS_COUNT:
            return {
                ...state,
                dataset_selected: {
                    ...state.dataset_selected,
                    items_quantity: action.payload.count
                }
            }      
        case CREATE_DATASET:
            return {
                ...state,
                dataset_inserted: action.payload
            }
        case DELETE_DATASET:
            return {
                ...state,
                dataset_delete: action.payload
            }
        case SELECT_DATASET:
            return {
                ...state,
                dataset_selected: {
                    ...state.dataset_selected,
                    id: action.payload.id,
                    name: action.payload.name,
                    description: action.payload.description,
                    create_date: action.payload.create_date,
                    user: action.payload.user,
                }
            }
        case DELETE_DATA_ITEM:
            return {
                ...state,
                dataitem_delete: action.payload,
                dataset_selected: {
                    ...state.dataset_selected,
                    header: {
                        ...state.dataset_selected.header,
                        items: state.dataset_selected.header.items - 1
                    }
                }
            }
        case DELETE_LABEL:
            return {
                ...state,
                datalabel_delete: action.payload,
                dataset_selected: {
                    ...state.dataset_selected,
                    header: {
                        ...state.dataset_selected.header,
                        labels: state.dataset_selected.header.labels - 1
                    }
                }
            }
        case ADD_DATASET_MEMBER:
            return {
                ...state,
                dataset_selected: {
                    ...state.dataset_selected,
                    header: {
                        ...state.dataset_selected.header,
                        collectors: state.dataset_selected.header.collectors + 1
                    }
                }
            }
        case DELETE_DATASET_MEMBER:
            return {
                ...state,
                dataset_selected: {
                    ...state.dataset_selected,
                    header: {
                        ...state.dataset_selected.header,
                        collectors: state.dataset_selected.header.collectors - 1
                    }
                }
            }
        case ADD_LABEL:
            return {
                ...state,
                datalabel_added: action.payload,
                dataset_selected: {
                    ...state.dataset_selected,
                    header: {
                        ...state.dataset_selected.header,
                        labels: state.dataset_selected.header.labels + 1
                    }
                }
            }
        case ADD_ITEM:
            return {
                ...state,
                dataitem_added: action.payload,
                dataset_selected: {
                    ...state.dataset_selected,
                    header: {
                        ...state.dataset_selected.header,
                        items: state.dataset_selected.header.items + action.payload.items_quantity
                    }
                }
            }
        case GET_DATASET_ANALYSIS:
            return {
                ...state,
                analysis: action.payload
            }
        case GET_DATE_DISTRIBUTION:
            return {
                ...state,
                date_distribution: action.payload
            }
        case GET_USER_CONTRIBUTION:
            return {
                ...state,
                user_contribution: action.payload
            }
        case GET_DATASET_PROJECTS_PERFORMANCE:
            return {
                ...state, 
                dataset_projects: action.payload
            }
        case GET_SEARCH_DATASETS:
            return {
                ...state,
                search_datasets: action.payload
            }
        case GET_DATASETS_PUBLIC:
        return {
            ...state,
            public_datasets: action.payload,
        }
        case ADD_NOTIFICTION_DATASET:
            return {
                ...state,
                notifications: [action.payload].concat(state.notifications)
            }
        case GET_DATASET_OFFERS:
        return {
            ...state,
            dataset_selected: {
            ...state.dataset_selected,
            offers: action.payload
            }
        }
        case GET_UNLABLED_SMAPLES:
        return {
            ...state,
            dataset_selected: {
            ...state.dataset_selected,
            unlabeled: action.payload
            }
        }          
    
        default:
            return state;
    }
}
export function datasetsToggleReducer(state = toggleInitialState, action) {
        switch(action.type) {
        case DATASET_DETAILS_ACTIVE: 
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    dataset_details: true
                }
            }
        case DATASET_DETAILS_NONACTIVE:
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    dataset_details: false
                }
            }
        case COLLECTORS_TEAM_ACTIVE: 
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    collectors_team: true
                }
            }
        case COLLECTORS_TEAM_NONACTIVE:
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    collectors_team: false
                }
            }
        case LABELS_SECTION_ACTIVE: 
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    labels_section: true
                }
            }
        case LABELS_SECTION_NONACTIVE:
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    labels_section: false
                }
            }
        case ITEMS_SECTION_ACTIVE: 
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    items_section: true
                }
            }
        case ITEMS_SECTION_NONACTIVE:
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    items_section: false
                }
            }
        case ADD_LABEL_ACTIVE: 
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    add_label: true
                }
            }
        case ADD_LABEL_NONACTIVE:
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    add_label: false
                }
            }
        case ADD_ITEM_ACTIVE: 
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    add_item: true
                }
            }
        case ADD_ITEM_NONACTIVE:
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    add_item: false
                }
            }
        case DATASET_ANALYZE_ACTIVE:
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    analyze: true
                }
            }
        case DATASET_ANALYZE_NONACTIVE:
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    analyze: false
                }
            }
        case DATASET_STATICS_ACTIVE: 
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    statics: true
                }
            }
        case DATASET_STATICS_NONACTIVE:
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    statics: false
                }
            }
        case DATASET_CONTRIBUTIONS_ACTIVE: 
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    user_contributions: true
                }
            }
        case DATASET_CONTRIBUTIONS_NONACTIVE:
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    user_contributions: false
                }
            }
        case DATASET_MODELS_GRAPH_ACTIVE: 
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    dataset_projects: true
                }
            }
        case DATASET_MODELS_GRAPH_NONACTIVE:
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    dataset_projects: false
                }
            }
        case DATE_UPLOAD_GRAPH_ACTIVE: 
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    date_distribution: true
                }
            }
        case DATE_UPLOAD_GRAPH_NONACTIVE:
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    date_distribution: false
                }
            }    
        case LABEL_DISTRIBUTION_ACTIVE: 
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    label_distribution: true
                }
            }
        case LABEL_DISTRIBUTION_NONACTIVE:
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    label_distribution: false
                }
            }
        case OFFER_ITEMS_ACTIVE: 
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    offer_items: true
                }
            }
        case OFFER_ITEMS_NONACTIVE:
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    offer_items: false
                }
            }

        case TAG_SAMPELS_ACTIVE: 
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    tag_samples: true
                }
            }
        case TAG_SAMPLES_NONACTIVE:
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    tag_samples: false
                }
            }
        case NOTIFICATION_DATASET_ACTIVE: 
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    notifications: true
                }
            }
        case NOTIFICATION_DATASET_NONACTIVE:
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    notifications: false
                }
            }
        case DATASET_ADD_NOTIFICATION_ACTIVE: 
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    add_notification: true
                }
            }
        case DATASET_ADD_NOTIFICATION_NONACTIVE:
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    add_notification: false
                }
            }
        case GET_ITEM_ACTIVATE:
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    get_item: action.payload
                }
            }
        case GET_ITEM_HIDE:
            return {
                ...state,
                dataset_display: {
                    ...state.dataset_display,
                    get_item: null
                }
            }
       default:
            return state;
    }
}