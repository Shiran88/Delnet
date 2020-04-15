import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { activateSection, hideSection } from '../../actions/project/sections.js';
import DatasetMenuItem from '../dataset/menu-item.js';
import { homepage } from '../../appconf.js'

class ProjectInfo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div id="project-information-section" className="section-in-main">
            <div id="information-header">
                <p className="dataset-links-title"></p>
            </div>
            <div id="profile">
            <table class="table">
                <tbody>
                <DatasetMenuItem name="General Details" description="display general data about selected project" state={ this.props.sections_status.general_details_active } 
                        button_type="primary" icon="fa-book" activate={ this.props.activateSection } hide={ this.props.hideSection } />
                <DatasetMenuItem name="Project Team" description="display and manage project team" state={ this.props.sections_status.project_team_active } 
                        button_type="info" icon="fa-users" activate={ this.props.activateSection } hide={ this.props.hideSection } />
                <DatasetMenuItem name="Model Files" description="manage and upload your model files" state={ this.props.sections_status.model_files_active } 
                        button_type="danger" icon="fa-file" activate={ this.props.activateSection } hide={ this.props.hideSection } />
                    <tr className="dataset-menu-row">
                        <td>
                            <button type="button" class="btn btn-outline-warning button-dataset-menu">
                                <i className="fa fa-edit"></i>
                            </button>
                        </td>
                        <td className="dataset-links">Notifications</td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.authentication.loggedIn,
        user: state.authentication.user,
        sections_status: state.projectSectionsReducer
    }
}


const mapDispatchToProps = dispatch => {
    return {
        activateSection: (section) => {
            dispatch(activateSection(section));
        },
        hideSection: (section) => {
            dispatch(hideSection(section));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectInfo);