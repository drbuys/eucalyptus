var React = require('react');
var koala = require('../../../library.jsx')



var ThemeBox = React.createClass({
    getInitialState: function() {
        return {
            themes: [],
            selectedTheme: null
        };
    },
    componentDidMount: function() {
        var url = this.props.site + '/'
        koala.request('GET', url +'general').then(function(genData) {
            koala.request('GET', url + 'themes').then(function(data) {
                this.setState({themes: data, selectedTheme: genData.theme_id}, function() {
                    console.log(this.state.themes);

                })
            }.bind(this));
        }.bind(this));


    },
    handleSelectChange: function(e) {
        e.preventDefault()
        this.setState({selectedTheme: e.target.options[e.target.selectedIndex].value})
    },
    saveTheme: function(e) {
        var url = this.props.site + '/'
        e.preventDefault()
        koala.request('POST', url + 'general', {theme_id: this.state.selectedTheme}).then(function() {
            console.log('theme change saved');
        })
    },

    render: function() {
        var options = this.state.themes.map(function(theme) {
            return (<option key={theme._id} value={theme._id}>{theme.name}</option>)
        })
        return (
            <div>
                <select value={this.state.selectedTheme} onChange={this.handleSelectChange}>{options}</select>
                <button onClick={this.saveTheme}>Change Theme</button>
            </div>
        );
    }

});

module.exports = ThemeBox;
