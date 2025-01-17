import React, { Component } from 'react';
import { connect } from 'react-redux';
import { homepage } from '../../appconf.js';
import { getItemsCount, getLabelsCount } from '../../actions/dataset/get'
import { selectDataset } from '../../actions/dataset/manipulation' 

class DataSetProject extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.user,
            labels_quantity: 0,
            items_quantity: 0
        }
        if (props.project.dataset != null) {
            let dataset = props.project.dataset
            this.props.getDatasetInfo(dataset)
            this.props.getLabelsCount(dataset)
            this.props.getItemsCount(dataset)
        }
        this.navigate = this.navigate.bind(this);
    }

    navigate() {
        this.props.selectDataset(this.props.project.dataset,() => {
            window.location = homepage + "/dataset"   
        })
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        this.setState({
            ...this.state,
            labels_quantity: nextProps.dataset.labels_quantity,
            items_quantity: nextProps.dataset.items_quantity
        })
    }

    render() {
        return (
            <div className="section-in-main">
                <div className="header-section-v1 header-v1-green">
                    <h1 id="projects-title">
                        Dataset
                    </h1>
                    <h2 id="projects-intro">
                       you are able to access and manage the project dataset by click in the link below.
                    </h2>
                </div>
                {
                    (this.props.project.dataset == null || this.props.project.dataset == 'null')?
                    <div className="message-text text-blue">
                        you haven't set a dataset for the project yet, <br/>
                        you can associate a dataset with the project through general details section. <br/>
                    </div>:
                    <div className="container">
                        {/* Dataset Name */}
                        <div className="row">
                            <div className="col-4">
                                <h6 className="text">Dataset Name:</h6>
                            </div>
                            <div className="col-6">
                                <h6 className="text">{ this.props.dataset.name }</h6>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="row">
                            <div className="col-4">
                                <h6 className="text">Description:</h6>
                            </div>
                            <div className="col-6">
                                <h6 className="text">{ this.props.dataset.description }</h6>
                            </div>
                        </div>

                        {/* Number of Labels */}
                        <div className="row">
                            <div className="col-4">
                                <h6 className="text">Number of labels:</h6>
                            </div>
                            <div className="col-6">
                                <h6 className="text">{ this.state.labels_quantity }</h6>
                            </div>
                        </div>

                        {/* Number of items */}
                        <div className="row">
                            <div className="col-4">
                                <h6 className="text">Number of Items:</h6>
                            </div>
                            <div className="col-6">
                                <h6 className="text">{ this.state.items_quantity }</h6>
                            </div>
                        </div>

                        <h6 className="text text-blue link-dataset" onClick={ this.navigate }>Navigate into dataset section</h6>
                    </div>
                }
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        loggedIn: state.authentication.loggedIn,
        username: state.authentication.user,
        project: state.projectReducer.project_selected,
        dataset: state.datasetsReducer.dataset_selected
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getDatasetInfo: (dataset_id, callback) => {
            dispatch(selectDataset(dataset_id, callback))
        },
        getItemsCount: (dataset_id) => {
            dispatch(getItemsCount(dataset_id))
        },
        getLabelsCount: (dataset_id) => {
            dispatch(getLabelsCount(dataset_id))
        },
        selectDataset: (dataset_id, callback) => {
            dispatch(selectDataset(dataset_id, callback))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataSetProject);