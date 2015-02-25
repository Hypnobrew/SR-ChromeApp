var RadioBox = React.createClass({
    getInitialState: function() {
        var backgroundTask = chrome.extension.getBackgroundPage();
        var state = backgroundTask.getState();

        console.log(JSON.stringify(state));

        return state;

        /*return {
            playing: false,
            volume: 50,
            resume: false,
            selectedChannel: 0,
            channels: []
        };*/
    },
    componentDidMount: function() {
        /*backgroundTask = chrome.extension.getBackgroundPage();
        return backgroundTask.getState();*/
    },
    handlePlayChange: function(playing) {
        var backgroundTask = chrome.extension.getBackgroundPage();
        console.log(backgroundTask);
        if(playing) {
            backgroundTask.start();
        }
        else {
            backgroundTask.stop();
        }
    },
    handleVolumeChange: function(volume) {
        backgroundTask.setVolume(volume);
    },
    handleResumeChange: function(resume) {
        backgroundTask.setShouldAutoplay(resume);
    },
    handleChannelChange: function(channelNumber) {
        backgroundTask.setChannel(channelNumber);
        this.setState({selectedChannel: channelNumber});
        console.log(channelNumber);
    },
    render: function() {
        return (
            <div className="radioBox">
                <PlayPart playing={this.state.playing} onPlayChange={this.handlePlayChange} />
                <InfoPart selectedChannel={this.state.selectedChannel} channels={this.state.channels}/>
                <ChannelListPart channels={this.state.channels} onChannelChange={this.handleChannelChange}/>
                <VolumePart volume={this.state.volume} onVolumeChange={this.handleVolumeChange} />
                <SettingsPart resume={this.state.resume} onResumeChange={this.handleResumeChange} />
            </div>
        );
    }
});

var PlayPart = React.createClass({
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
      <div className="playPart part" onClick={this.handleClick}>
          <span className={playIcon}></span>
      </div>
    );
  }
});

var InfoPart = React.createClass({
  render: function() {
    var selected = this.props.selectedChannel;
    var channel = findElement(this.props.channels, 'id', selected);

    return (
      <div className="infoPart bigpart">
        <img src={channel.img}/>
        <span>{channel.name}</span>
      </div>
    );
  }
});

function findElement(array, name, value) {
  for (var i=0; i < array.length; i++)
    if (array[i][name] == value)
      return array[i];
}

var ChannelListPart = React.createClass({
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
        <ChannelPart url={channel.url} number={channel.id} key={channel.id} itemSelected={that.handleItemClick} name={channel.name} img={channel.img}/>
      );
    });

    return (
      <div className="channelPart part">
        <span className="glyphicon glyphicon-list" onClick={this.handleClick}></span>
        <ul className={channelClass}>
            {channelNodes}
        </ul>
      </div>
    );
  }
});

var ChannelPart = React.createClass({
  onClick: function(event) {
    this.props.itemSelected(this.props.number);
  },
  render: function() {
    return (
      <li url={this.props.url} key={this.props.key} number={this.props.number} onClick={this.onClick}>
        <img src={this.props.img}/>
        {this.props.name}
      </li>
    );
  }
});

var VolumePart = React.createClass({
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
      <div className="volumePart part">
        <span className={volumeClass}>
          <input className="slider" type="range" min="0" max="100" step="1" onChange={this.handleChange}/>
        </span>
      </div>
    );
  }
});

var SettingsPart = React.createClass({
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
      <div className="settingsPart part" onClick={this.handleClick}>
        <span className={resumeClass}></span>
      </div>
    );
  }
});

React.render(
    <RadioBox />, document.getElementById('content')
);
