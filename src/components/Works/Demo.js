import React from 'react';
import classNames from 'classnames';

// Components
import Transition from 'components/Utils/Transition';
import Media from './Media';
import PaginationArrow from './PaginationArrow';
const Thumb = ({ name, screenshots, onChange }) => (
    <div className="work__demo overflow--x animate--general">
        {screenshots.map((item, index) => (
            <img
                key={index}
                src={`/src/images/screenshots/thumb/${name}_${index}.jpg`}
                onClick={onChange.bind(this, index)}
            />
        ))}
    </div>
);
const Large = ({ count, index, src, description, onChange }) => {
    const descriptionClass = classNames({
        'work__demo--zoom__description': true,
        'text_uppercase': src.indexOf('PodPicker') >= 0
    });
    return (
        <div className="work__demo--zoom animate--general">
            <Media type="image" src={src} onChange={onChange} />
            <PaginationArrow count={count} index={index} onChange={onChange} />
            <span className={descriptionClass}>{description}</span>
        </div>
    );
};


// Export
export default class Demo extends React.Component {
    constructor(props) {
        super(props)
        this.state = { demoActive: false, largeSrc: '', largeIndex: 0, largeDescription: '' }
        this.handleLargeSrcChange = this.handleLargeSrcChange.bind(this)
    }
    handleLargeSrcChange(index) {
        const { name, screenshots } = this.props;
        const largeSrc = (
            index < 0 || index >= screenshots.length
                ? ''
            : `/src/images/screenshots/large/${name}_${index}.jpg`
        );

        this.setState({ largeSrc, largeIndex: index, largeDescription: screenshots[index] })
    }
    componentWillReceiveProps(nextProps) {
        nextProps.active
            ? setTimeout(() => this.setState({ demoActive: true }), 700)
        : this.setState({ demoActive: false })
    }
    render() {
        const { demoActive, largeSrc, largeIndex, largeDescription } = this.state;
        return (
            <Transition>
            {demoActive && (
                <div>
                    <Thumb onChange={this.handleLargeSrcChange} {...this.props}  />
                    <Transition>
                    {largeSrc && (
                        <Large
                            count={this.props.screenshots.length}
                            index={largeIndex}
                            src={largeSrc}
                            description={largeDescription}
                            onChange={this.handleLargeSrcChange}
                        />
                    )}
                    </Transition>
                </div>
            )}
            </Transition>
        );
    }
}
