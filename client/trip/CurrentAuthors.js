import React from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Avatar from 'material-ui/Avatar';
import { isEqual } from 'lodash';
import * as colors from 'material-ui/styles/colors';

class CurrentAuthors extends React.Component {

	shouldComponentUpdate(nextProps) {
		return (!isEqual(this.props,nextProps));
	}

	getHashCode(str) {
		 let hash = 0, i, chr, len;
		 if (str.length === 0) return hash;
  	 for (i = 0, len = str.length; i < len; i++) {
	    chr   = str.charCodeAt(i);
	    hash  = ((hash << 5) - hash) + chr;
	    hash |= 0; // Convert to 32bit integer
  	}
  	return hash;
	}

	//TODO: MAKE THIS NOT RETURN UGLY COLORS
	getAvatarColor(nameString) {
		let hash = this.getHashCode(nameString);
		let r = (hash & 0xFF0000) >> 16;
		let g = (hash & 0x00FF00) >> 8;
		let b = hash & 0x0000FF;
		return `rgba(${r},${g},${b})`;
	}

	render() {
		const currentAuthorIds = Object.keys(this.props.currentAuthors);
		const currentAuthors = currentAuthorIds.map(authorId => {
      let firstTwo = this.props.currentAuthors[authorId].name.substring(0,2);
      firstTwo = firstTwo.length < 1 ? '?' : firstTwo;
      let blinkClass = this.props.currentAuthors[authorId].typing ? ' blinking' : '';
      let finalClass = `author-avatar${blinkClass}`;
      let backgroundColor = this.getAvatarColor(this.props.currentAuthors[authorId].name);
      console.log(backgroundColor);
      return <Avatar key={authorId + '_avatar'} backgroundColor={backgroundColor} className={finalClass}>{firstTwo}</Avatar>;
    });
    return (
    	<div className="currently-here-container">
    		<span className="currently-here-text">Currently here: </span>
	    	<ReactCSSTransitionGroup 
	          transitionName="currently-here-transition" 
	          transitionEnterTimeout={500} 
	          transitionLeaveTimeout={300}
	        >
	          {currentAuthors}
	      </ReactCSSTransitionGroup>
	    </div>
    );
	}
}

const mapStateToProps = state => Object.assign({}, { currentAuthors: state.trip.currentAuthors}); 

export default connect(mapStateToProps)(CurrentAuthors);