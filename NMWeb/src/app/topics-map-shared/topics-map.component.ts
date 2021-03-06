import {Component, Input, OnInit} from '@angular/core';
import {GeoLocation} from '../user-profile-shared/user-geo-locations.types'
import {TopicsDetailsService} from '../topic-details/topics-details.service'
import {ActivatedRoute, Router} from '@angular/router'
import {TagEntry} from '../topics-shared/tag-entry'
import {logosSizeRatio} from '../../assets/logos-size-ratio'
import {DbListReadOnly} from '../shared/db.service'
import { USER_ROUTE_WITH_TRAILING_SLASH } from '../shared/routes'

@Component({
  selector: 'app-topics-map',
  templateUrl: './topics-map.component.html',
  styleUrls: ['./topics-map.component.scss']
})
export class TopicsMapComponent implements OnInit {
  @Input() topics: TagEntry[];
  icon;
  iconBaseSize = 25;
  usersGeoLocations = {};
  offsets = [];
  topicsIcon = [];
  offsetRadius = 1;
  coordinates: GeoLocation = {latitude: 36.726, longitude: -4.476} /* mock default value for faster testing */;
  constructor(
    private topicDetailsService: TopicsDetailsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.topics.forEach((topic, index) => {
      this.topicsIcon[topic.id] = this.getMapTopicIcon(topic);
      this.offsets.push(this.getOffset(index));
      this.getUsersWithTopicGeoLocations(topic.id)
        .subscribe((geoLocations) => {
          this.usersGeoLocations[topic.id] = geoLocations;
      })
    });
  }

  getUsersWithTopicGeoLocations(topicId: string) {
    return this.topicDetailsService.getAllGeoLocationsOfUsersWithTopic(topicId);
  }

  getMapTopicIcon(topic: TagEntry) {
    //May be extracted in a service
    let icon;
    if(topic.logo) {
      let logoFileName = topic.logo.replace(/^.*[\\\/]/, '');
      let logoSizeRatio = logosSizeRatio[logoFileName] || {width: 1, height: 1};
      let scaleFactor = this.iconBaseSize / (logoSizeRatio.width * logoSizeRatio.height);
      if(logoSizeRatio) {
        icon = {
          url: topic.logo,
          scaledSize: {
            width: scaleFactor * logoSizeRatio.width,
            height: scaleFactor * logoSizeRatio.height
          }
        }
      }
    }
    return icon;
  }

  onMarkerClick(marker: GeoLocation) {
    this.router.navigate(['/' + USER_ROUTE_WITH_TRAILING_SLASH + marker.userId])
  }

  onIconBaseSizeChange() {
    for(let topic of this.topics) {
      this.topicsIcon[topic.id] = this.getMapTopicIcon(topic);
    }
  }

  onOffsetRadiusChange() {
    let newOffsets = [];
    this.topics.forEach((topic, index) => {
      newOffsets.push(this.getOffset(index));
    });
    this.offsets = newOffsets;
  }

  getOffset(index: number) {
    let degree = index*2*Math.PI/this.topics.length;
    let scaleFactor = this.offsetRadius*this.topics.length/5000;
    return {
      lat: Math.cos(degree)*scaleFactor,
      lon: Math.sin(degree)*scaleFactor
    }
  }

}
