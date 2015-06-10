Header = React.createClass({
   render () {
       console.log(Meteor.userId());
       return (
           <div>
               <nav className="navbar navbar-default" role="navigation">
                   <div className="container-fluid">
                       <div className="navbar-header">
                           <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navigation">
                               <span className="sr-only">Toggle navigation</span>
                               <span className="icon-bar"></span>
                               <span className="icon-bar"></span>
                               <span className="icon-bar"></span>
                           </button>
                           <a className="navbar-brand" href="/">Microscope</a>
                       </div>
                       <div className="collapse navbar-collapse" id="navigation">
                           <ul className="nav navbar-nav">
                               {Meteor.userId() ? <li><a href="/submit">Submit Post</a></li> : ''}
                           </ul>
                           <ul className="nav navbar-nav navbar-right">
                           </ul>
                       </div>
                   </div>
               </nav>
           </div>
       );
   }
});

$(document).ready( function () {
    React.render(<Header />, document.getElementById("header-section"));
});
