(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var RadioBox = React.createClass({displayName: "RadioBox",
    getInitialState: function() {
      console.log('init');

      return {
        playing: false,
        volume: 50,
        resume: false,
        selectedChannel: 132,
        channels: [
          {
            id: 132,
            name: "P1",
            url: "http://sverigesradio.se/topsy/direkt/132.mp3",
            img: "http://sverigesradio.se/sida/images/132/2186745_512_512.jpg"
          },
          {
            id: 163,
            name: "P2",
            url: "http://sverigesradio.se/topsy/direkt/163.mp3",
            img: "http://sverigesradio.se/sida/images/163/2186754_512_512.jpg"
          }
        ]
      };
    },
    componentDidMount: function() {

    },
    handlePlayChange: function(playing) {

    },
    handleVolumeChange: function(volume) {

    },
    handleResumeChange: function(resume) {

    },
    handleChannelChange: function(channelNumber) {
      this.setState({selectedChannel: channelNumber});
      console.log(channelNumber);
    },
    render: function() {
        return (
            React.createElement("div", {className: "radioBox"}, 
                React.createElement(PlayPart, {playing: this.state.playing, onPlayChange: this.handlePlayChange}), 
                React.createElement(InfoPart, {selectedChannel: this.state.selectedChannel, channels: this.state.channels}), 
                React.createElement(ChannelListPart, {channels: this.state.channels, onChannelChange: this.handleChannelChange}), 
                React.createElement(VolumePart, {volume: this.state.volume, onVolumeChange: this.handleVolumeChange}), 
                React.createElement(SettingsPart, {resume: this.state.resume, onResumeChange: this.handleResumeChange})
            )
        );
    }
});

var PlayPart = React.createClass({displayName: "PlayPart",
  getInitialState: function() {
    return {playing: this.props.playing};
  },
  handleClick: function(event) {
    var state = !this.state.playing;
    this.props.onPlayChange(state);
    this.setState({playing: state});
  },
  render: function() {
    var playIcon = this.state.playing ? 'glyphicon glyphicon-stop' : 'glyphicon glyphicon-play';
    return (
      React.createElement("div", {className: "playPart part", onClick: this.handleClick}, 
          React.createElement("span", {className: playIcon})
      )
    );
  }
});

var InfoPart = React.createClass({displayName: "InfoPart",
  render: function() {
    var selected = this.props.selectedChannel;
    var channel = findElement(this.props.channels, 'id', selected);

    return (
      React.createElement("div", {className: "infoPart bigpart"}, 
        React.createElement("img", {src: channel.img}), 
        React.createElement("span", null, channel.name)
      )
    );
  }
});

function findElement(array, name, value) {
  for (var i=0; i < array.length; i++)
    if (array[i][name] == value)
      return array[i];
}

var ChannelListPart = React.createClass({displayName: "ChannelListPart",
  getInitialState: function() {
    return {showing: false};
  },
  handleClick: function(event) {
    this.setState({showing: !this.state.showing});
  },
  handleItemClick: function(key) {
    this.props.onChannelChange(key);
    this.setState({showing: false});
  },
  render: function() {
    var that = this;
    var channelClass = this.state.showing ? 'channelDropdown' : 'channelDropdown hidden';
    var channelNodes = this.props.channels.map(function (channel) {
      return (
        React.createElement(ChannelPart, {url: channel.url, number: channel.id, key: channel.id, itemSelected: that.handleItemClick, name: channel.name, img: channel.img})
      );
    });

    return (
      React.createElement("div", {className: "channelPart part"}, 
        React.createElement("span", {className: "glyphicon glyphicon-list", onClick: this.handleClick}), 
        React.createElement("ul", {className: channelClass}, 
            channelNodes
        )
      )
    );
  }
});

var ChannelPart = React.createClass({displayName: "ChannelPart",
  onClick: function(event) {
    this.props.itemSelected(this.props.number);
  },
  render: function() {
    return (
      React.createElement("li", {url: this.props.url, key: this.props.key, number: this.props.number, onClick: this.onClick}, 
        React.createElement("img", {src: this.props.img}), 
        this.props.name
      )
    );
  }
});

var VolumePart = React.createClass({displayName: "VolumePart",
  getInitialState: function() {
    return {volume: this.props.volume};
  },
  handleChange: function(event) {
    this.props.onVolumeChange(event.target.value);
    this.setState({volume: event.target.value});
  },
  render: function() {
    var value = parseInt(this.state.volume, 10);
    var volumeClass = 'glyphicon ';
    if(value === 0) {
      volumeClass += 'glyphicon-volume-off';
    }
    else if(value > 0 && value <= 50) {
      volumeClass += 'glyphicon-volume-down';
    }
    else {
      volumeClass += 'glyphicon-volume-up';
    }

    return (
      React.createElement("div", {className: "volumePart part"}, 
        React.createElement("span", {className: volumeClass}, 
          React.createElement("input", {className: "slider", type: "range", min: "0", max: "100", step: "1", onChange: this.handleChange})
        )
      )
    );
  }
});

var SettingsPart = React.createClass({displayName: "SettingsPart",
  getInitialState : function() {
    return {resume: this.props.resume};
  },
  handleClick: function(event) {
    this.props.onResumeChange(!this.state.resume);
    this.setState({resume: !this.state.resume});
  },
  render: function() {
    var resumeClass = this.state.resume ? 'glyphicon glyphicon-ban-circle' : 'glyphicon glyphicon-repeat';
    return (
      React.createElement("div", {className: "settingsPart part", onClick: this.handleClick}, 
        React.createElement("span", {className: resumeClass})
      )
    );
  }
});

React.render(
    React.createElement(RadioBox, null), document.getElementById('content')
);


},{}]},{},[1]);
