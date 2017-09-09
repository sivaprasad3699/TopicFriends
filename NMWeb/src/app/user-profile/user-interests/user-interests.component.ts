import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {SymmetricInteractions, TopicInterest, UserInterests, WantedTopics} from '../user-interests'
import {Observable} from 'rxjs/Observable'
import {createTopicsDictionary, UserProfileService} from '../user-profile.service'
import {AuthService} from '../auth.service'
import {ItemListInputComponent} from '../item-list-input/item-list-input.component'
import {FormBuilder, FormGroup} from '@angular/forms'

const INITIAL_WANTED_TOPICS: WantedTopics = {
  active: true,
  topics: {}
}

function buildSupplyDemandSubForm(formBuilder: FormBuilder) {
  return formBuilder.group({
    supply: INITIAL_WANTED_TOPICS,
    demand: INITIAL_WANTED_TOPICS,
  })
}

@Component({
  selector: 'app-user-interests',
  templateUrl: './user-interests.component.html',
  styleUrls: ['./user-interests.component.scss']
})
export class UserInterestsComponent implements OnInit {

  whatUserWants = UserInterests.fromJson({});

  @Input() thisFormGroup: FormGroup
  supplyDemandFormGroup: FormGroup

  userInterestsObservable: Observable<UserInterests>;

  constructor(
    protected userProfileService: UserProfileService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.supplyDemandFormGroup = <FormGroup> this.thisFormGroup.get('byInteractionMode').get('supplyDemand')

    this.authService.user.subscribe(user => {
      if ( user ) {
        this.userInterestsObservable = this.userProfileService.getUserInterests();
        this.userInterestsObservable.subscribe((userInterests: UserInterests) => {
          this.applyFromDb(userInterests)
        });
      }
    })
  }

  private applyFromDb(userInterests: UserInterests) {
    this.thisFormGroup.patchValue(userInterests) // FIXME: use setValue with filled-in missing values
    // this.formGroup.setValue(userInterests)
    this.thisFormGroup.markAsPristine()
  }

  getUserInterests(): UserInterests {
    return this.thisFormGroup.value
  }

  static buildFormGroup(formBuilder: FormBuilder): FormGroup {
    // userInterests?.byInteractionMode?.symmetric?.exchange?.topics
    return formBuilder.group({
      byInteractionMode: formBuilder.group({
        symmetric: formBuilder.group({
          exchange: INITIAL_WANTED_TOPICS,
          pairProgramming: INITIAL_WANTED_TOPICS,
          hackathon: INITIAL_WANTED_TOPICS,
        }),
        supplyDemand: formBuilder.group({
          intern: buildSupplyDemandSubForm(formBuilder),
          mentor: buildSupplyDemandSubForm(formBuilder),
          freelance: buildSupplyDemandSubForm(formBuilder),
        })
      })
    })
  }

}
