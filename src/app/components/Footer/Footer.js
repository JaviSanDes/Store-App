import React, {Component} from 'react';
import classes from './Footer.css';

class Footer extends Component {
  render () {
    return(
      <div className={classes.box}>
        <div className={classes.information}>
          <div className={classes.aboutCompany}>
            <h3>More about Company</h3>
            <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
            <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
          </div>
          <div className={classes.Connected}>
            <h3>Keep Connected</h3>
            <div>
              <img src={require("../../static/social_media_PNG/facebook.png")}
                    alt=''
                    width='35'
                    height='35'>
              </img>
              <p>Like us on Facebook</p>
            </div>
            <div>
              <img src={require("../../static/social_media_PNG/twitter.png")}
                  alt=''
                  width='35'
                  height='35'>
              </img>
              <p>Follow us on Twitter</p>
            </div>
            <div>
              <img src={require("../../static/social_media_PNG/google.png")}
                  alt=''
                  width='35'
                  height='35'>
              </img>
              <p>Add us on Google Plus</p>
            </div>
            <div>
              <img src={require("../../static/social_media_PNG/instagram.png")}
                  alt=''
                  width='35'
                  height='35'>
              </img>
              <p>Follow us on Instagram</p>
            </div>
            <div>
              <img src={require("../../static/social_media_PNG/linkedin.png")}
                  alt=''
                  width='35'
                  height='35'>
              </img>
              <p>Follow us on Linkedin</p>
            </div>
            
          </div>
          <div className={classes.Contact}>
            <h3>Contact Information</h3>
            <p>The company name Lorem ipsum dolor, Glasglow Dr 40 Fe 72.</p>
            <p>1234567890</p>
            <p>contact@example.com</p>
          </div>
        </div>
        
        <div className={classes.copyrhigt}>
          <p>© 2019 Simple Store App. All Rights Reserved | Design by JavSan</p>
          <p>Company Information | Privacy Policy | Terms & Conditions</p>
        </div>
      </div>
    )
  }
}

export default Footer;