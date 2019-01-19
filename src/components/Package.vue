<template>
  <smooth-reflow>
    <container>
      <row class="mt-5 align-items-center justify-content-center">
        <column md="6" class="example-drag">
          <form @submit="onSubmit" @reset="onReset" novalidate v-if="showForm">
            <p class="h4 text-center mb-4">{{ $t('message.package.pageTitle') }}</p>
            <div class="grey-text">

              <mdb-card>
                <mdb-card-header color="green darken-1" tag="h5">
                  {{ $t('message.package.blockPackage') }}
                </mdb-card-header>
                <mdb-card-body>

                  <mdb-textarea-custom id="contents" name="contents" :label="$t('message.package.labelContents')"
                                       @input="handleTextareaContents" :rows="2" required v-validate="'required|min:8'"
                                       :validation-error="errors.first('contents')"/>

                  <div class="input-select-custom input-group">
                    <mdb-select-custom @getValue="getListPackageTypeIdValue" id="listPackageTypeId"
                                       name="listPackageTypeId" required v-validate="'included:'+packageTypesListIds"
                                       :validationError="errors.first('listPackageTypeId')">
                      <option selected disabled value="0">{{ $t('message.package.selectDefaultPackageType') }}</option>
                      <option v-for="packageType in packageTypesList" :value="packageType.id">{{
                        $t('message.lists.packageType.'+packageType.package_type) }}
                      </option>
                    </mdb-select-custom>
                    <label for="listPackageTypeId">{{ $t('message.package.labelPackageType') }}</label>
                  </div>

                  <div class="upload mt-3">
                    <div v-if="files.length">
                      <span v-for="(file, index) in files" :key="file.id">
                        <span>{{file.name}}</span> -
                        <span><img v-if="file.thumb" :src="file.thumb" width="80" height="auto"/></span> -
                        <span>{{file.size}}</span> -
                        <span v-if="file.error">{{file.error}}</span>
                        <span v-else-if="file.success">success</span>
                        <span v-else-if="file.active">active</span>
                        <span v-else></span>
                        <a class="dropdown-item" href="#"
                           @click.prevent="file.error=false; file.success=false">Reset</a>
                        <a class="dropdown-item" href="#" @click.prevent="$refs.upload.remove(file)">Remove</a>
                        {{form.photoPath}}
                      </span>
                    </div>
                    <div class="justify-content-center" v-else>
                      <p>Drop files anywhere to upload<br/>or</p>
                      <label for="file" class="btn btn-outline-green">Select Files</label>
                    </div>

                    <!--TODO: Use parametric URL-->
                    <file-upload
                      v-model="files" post-action="http://raketa.local/api/v1/files"
                      :headers="{'Authorization': 'Bearer '+this.$store.getters.getAuthToken}"
                      @input-filter="inputFilter" @input-file="inputFile" :accept="accept" :extensions="extensions"
                      :drop="true" :drop-directory="false" :multiple="false" :size="1024 * 1024" ref="upload"/>

                    <div v-show="$refs.upload && $refs.upload.dropActive" class="drop-active">
                      <h3>Drop files to upload</h3>
                    </div>
                  </div>

                </mdb-card-body>
              </mdb-card>

              <mdb-card class="mt-3">
                <mdb-card-header color="green darken-1" tag="h5">
                  {{ $t('message.package.blockPickup') }}
                </mdb-card-header>
                <mdb-card-body>

                  <mdb-input-custom v-model="form.pickupLocation" name="pickupLocation"
                                    :label="$t('message.package.labelPickupLocation')" type="text" required
                                    v-validate="'required|alpha_spaces|min:6'"
                                    :validation-error="errors.first('pickupLocation')"/>

                  <!--TODO: Value is required-->
                  <mdb-date-picker id="pickupDate" name="pickupDate" :date="pickupDate"
                                   :option="pickupDateDatePickerOptions" @getValue="getPickupDateValue"
                                   required></mdb-date-picker>

                  <mdb-time-picker id="pickupTime" name="pickupTime" :label="$t('message.package.labelPickupTime')"
                                   :placeholder="$t('message.package.placeholderTime')" :hoursFormat="24"
                                   @getValue="getPickupTimeValue"/>

                  <mdb-textarea-custom id="pickupNote" name="pickupNote" :label="$t('message.package.labelPickupNote')"
                                       @input="handleTextareaPickupNote" :rows="2"/>

                </mdb-card-body>
              </mdb-card>

              <mdb-card class="mt-3">
                <mdb-card-header color="green darken-1" tag="h5">{{ $t('message.package.blockDelivery') }}
                </mdb-card-header>
                <mdb-card-body>

                  <mdb-input-custom v-model="form.deliveryLocation" name="deliveryLocation"
                                    :label="$t('message.package.labelDeliveryLocation')" type="text" required
                                    v-validate="'required|alpha_spaces|min:6'"
                                    :validation-error="errors.first('deliveryLocation')"/>

                  <!--TODO: Value is required-->
                  <mdb-date-picker id="deliveryDate" name="deliveryDate" :date="deliveryDate"
                                   :option="deliveryDateDatePickerOptions" @getValue="getDeliveryDateValue"
                                   required></mdb-date-picker>

                  <mdb-time-picker id="deliveryTime" name="deliveryTime"
                                   :label="$t('message.package.labelDeliveryTime')"
                                   :placeholder="$t('message.package.placeholderTime')" :hoursFormat="24"
                                   @getValue="getDeliveryTimeValue"/>

                  <mdb-textarea-custom id="deliveryNote" name="deliveryNote"
                                       :label="$t('message.package.labelDeliveryNote')"
                                       @input="handleTextareaDeliveryNote" :rows="2"/>

                </mdb-card-body>
              </mdb-card>

              <mdb-card class="mt-3">
                <mdb-card-header color="green darken-1" tag="h5">{{ $t('message.package.blockPrice') }}
                </mdb-card-header>
                <mdb-card-body>

                  <mdb-input-custom v-model="form.price" name="price" :label="$t('message.package.labelPrice')"
                                    type="text" required v-validate="'required|numeric'"
                                    :validation-error="errors.first('price')"/>

                  <mdb-input-custom v-model="form.priceMaxIncrease" name="priceMaxIncrease"
                                    :label="$t('message.package.labelPriceMaxIncrease')" type="text"
                                    v-validate="'numeric'" :validation-error="errors.first('priceMaxIncrease')"/>

                  <div class="input-select-custom input-group">
                    <!--TODO: Make "no insurance" as default value" -->
                    <mdb-select-custom @getValue="getListInsuranceRangeId" id="listInsuranceRangeId"
                                       name="listInsuranceRangeId" required
                                       v-validate="'included:'+insuranceRangesListIds"
                                       :validationError="errors.first('listInsuranceRangeId')">
                      <option selected disabled value="0">{{ $t('message.package.selectDefaultInsuranceRange') }}
                      </option>
                      <option v-for="insuranceRange in insuranceRangesList" :value="insuranceRange.id">{{
                        $t('message.lists.insuranceRange.'+insuranceRange.insurance_range) }}
                      </option>
                    </mdb-select-custom>
                    <label for="listInsuranceRangeId">{{ $t('message.package.labelInsuranceRange') }}</label>
                  </div>

                </mdb-card-body>
              </mdb-card>

              <mdb-card class="mt-3">
                <mdb-card-header color="green darken-1" tag="h5">{{ $t('message.package.blockOther') }}
                </mdb-card-header>
                <mdb-card-body>

                  <mdb-input-custom v-model="form.alternativeContact" name="alternativeContact"
                                    :label="$t('message.package.labelAlternativeContact')" type="text"/>

                  <mdb-input-custom v-model="form.password" name="password" :label="$t('message.package.labelPassword')"
                                    type="text"/>

                </mdb-card-body>
              </mdb-card>

              <div class="mt-3">
                <btn color="primary" type="submit">{{ $t('message.package.buttonSend') }}</btn>
                <btn outline="primary" type="reset">{{ $t('message.package.buttonReset') }}</btn>
              </div>

            </div>
          </form>
        </column>
      </row>

      <!--TODO: redirect to package list after success - close and button-->
      <modal v-if="showPackageCreationSuccessModal" @close="showPackageCreationSuccessModal = false" success>
        <modal-header>
          <modal-title>{{ $t('message.package.packageCreationSuccessTitle') }}</modal-title>
        </modal-header>
        <modal-body>
          <row>
            <column col="3" class="text-center">
              <fa icon="check" size="4x"/>
            </column>
            <column col="9">
              <p>{{ $t('message.package.packageCreationSuccessText') }}</p>
            </column>
          </row>
        </modal-body>
        <modal-footer center>
          <btn color="success" @click.native="showPackageCreationSuccessModal = false; $router.push({name: 'Home'})">
            {{ $t('message.package.packageCreationSuccessButton') }}
          </btn>
        </modal-footer>
      </modal>

      <modal v-if="showPackageCreationFailedModal" @close="showPackageCreationFailedModal = false" danger>
        <modal-header>
          <modal-title>{{ $t('message.package.packageCreationFailedTitle') }}</modal-title>
        </modal-header>
        <modal-body>
          <row>
            <column col="3" class="text-center">
              <fa icon="exclamation" size="4x"/>
            </column>
            <column col="9">
              <p>{{ $t('message.package.packageCreationFailedText') }}</p>
            </column>
          </row>
        </modal-body>
        <modal-footer center>
          <btn color="danger" @click.native="showPackageCreationFailedModal = false">{{
            $t('message.package.packageCreationFailedButton') }}
          </btn>
        </modal-footer>
      </modal>

    </container>
  </smooth-reflow>
</template>

<script>
  import * as Const from '../const';
  import {
    Btn,
    Column,
    Container,
    Fa,
    mdbCard,
    mdbCardBody,
    mdbCardHeader,
    mdbDatePicker,
    mdbTimePicker,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle,
    Row
  } from 'mdbvue';
  import mdbInputCustom from './gui/MdbInputCustom';
  import mdbSelectCustom from './gui/MdbSelectCustom';
  import mdbTextareaCustom from './gui/MdbTextareaCustom';
  import FileUpload from 'vue-upload-component';
  import raketa from '../api/raketa';

  export default {
    name: 'package',
    components: {
      Btn,
      Column,
      Container,
      Fa,
      FileUpload,
      Modal,
      ModalBody,
      ModalFooter,
      ModalHeader,
      ModalTitle,
      Row,
      mdbCard,
      mdbCardHeader,
      mdbCardBody,
      mdbDatePicker,
      mdbInputCustom,
      mdbSelectCustom,
      mdbTextareaCustom,
      mdbTimePicker
    },
    data () {
      return {
        form: {
          contents: '',
          photoPath: '',
          listPackageTypeId: 0,
          pickupLocation: '',
          pickupDate: '',
          pickupTime: '',
          pickupNote: '',
          deliveryLocation: '',
          deliveryDate: '',
          deliveryTime: '',
          deliveryNote: '',
          price: '',
          priceMaxIncrease: '',
          listInsuranceRangeId: 0,
          alternativeContact: '',
          password: ''
        },
        files: [],
        pickupDate: {
          date: ''
        },
        deliveryDate: {
          date: ''
        },
        accept: 'image/png,image/gif,image/jpeg,image/webp',
        extensions: 'gif,jpg,jpeg,png,webp',
        // TODO: Make this configuration global across all components
        // TODO: Make format locale aware
        globalDatePickerOptions: {
          type: 'day',
          week: this.$i18n.t('message.calendar.week'),
          month: this.$i18n.t('message.calendar.month'),
          // format: 'D.M.YYYY',
          format: 'YYYY-MM-DD',
          inputStyle: {
            'display': 'inline-block',
            'padding': '6px',
            'line-height': '22px',
            'font-size': '16px',
            'border': '2px solid #fff',
            'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
            'border-radius': '2px',
            'color': '#5F5F5F'
          },
          color: {
            header: 'primary',
            headerText: 'white',
            checkedDay: 'primary'
          },
          buttons: {
            ok: 'Ok',
            cancel: 'Cancel'
          }
        },
        showForm: true,
        showPackageCreationSuccessModal: false,
        showPackageCreationFailedModal: false
      };
    },
    computed: {
      packageTypesList () {
        return this.$store.state.lists.packageTypes;
      },
      packageTypesListIds () {
        return this.$store.getters.packageTypesListIds;
      },
      insuranceRangesList () {
        return this.$store.state.lists.insuranceRanges;
      },
      insuranceRangesListIds () {
        return this.$store.getters.insuranceRangesListIds;
      },
      pickupDateDatePickerOptions () {
        let globalOptions = this.globalDatePickerOptions;
        let localOptions = {
          placeholder: this.$i18n.t('message.package.labelPickupDate')
        };
        return this.$utils.mergeObjects(globalOptions, localOptions);
      },
      deliveryDateDatePickerOptions () {
        let globalOptions = this.globalDatePickerOptions;
        let localOptions = {
          placeholder: this.$i18n.t('message.package.labelDeliveryDate')
        };
        return this.$utils.mergeObjects(globalOptions, localOptions);
      }
    },
    watch: {},
    methods: {
      // Submit package form
      onSubmit (event) {
        event.preventDefault();

        this.$validator.validate()
          .then(result => {
            if (result) {
              // Validation is OK, proceed with package submission

              let packageBox = {
                contents: this.form.contents,
                photo_path: this.form.photoPath,
                list_package_type_id: this.form.listPackageTypeId,
                pickup_location: this.form.pickupLocation,
                pickup_date: this.form.pickupDate,
                pickup_time: this.form.pickupTime,
                pickup_note: this.form.pickupNote,
                delivery_location: this.form.deliveryLocation,
                delivery_date: this.form.deliveryDate,
                delivery_time: this.form.deliveryTime,
                delivery_note: this.form.deliveryNote,
                price: this.form.price,
                price_max_increase: this.form.priceMaxIncrease,
                list_insurance_range_id: this.form.listInsuranceRangeId,
                alternative_contact: this.form.alternativeContact,
                password: this.form.password
              };

              // Call package create API
              raketa.createPackage(packageBox)
                .then(response => {
                  // Package was created,
                  if (Const.LOG_LEVEL >= Const.LOG_DEBUG) {
                    console.log('✓ Package created');
                  }
                  this.showPackageCreationSuccessModal = true;
                })
                .catch(response => {
                  if (Const.LOG_LEVEL >= Const.LOG_DEBUG) {
                    console.log('✗ Package creation failed');
                  }
                  this.showPackageCreationFailedModal = true;
                });
            }
          });
      },

      // Reset form to original state
      onReset (event) {
        event.preventDefault();

        // Reset our form values
        this.form.contents = '';
        this.form.photoPath = '';
        this.form.listPackageTypeId = 0;
        this.form.pickupLocation = '';
        this.form.pickupDate = '';
        this.form.pickupTime = '';
        this.form.pickupNote = '';
        this.form.deliveryLocation = '';
        this.form.deliveryDate = '';
        this.form.deliveryTime = '';
        this.form.deliveryNote = '';
        this.form.price = '';
        this.form.priceMaxIncrease = '';
        this.form.listInsuranceRangeId = 0;
        this.form.alternativeContact = '';
        this.form.password = '';

        // Reset files ready for upload
        this.$refs.upload.clear();

        // Trick to reset/clear native browser form validation state
        this.showForm = false;
        this.$nextTick(() => {this.showForm = true;});
      },

      // Handle input from contents textarea
      handleTextareaContents (value) {
        this.form.contents = value;
      },

      // Handle input from pickup note textarea
      handleTextareaPickupNote (value) {
        this.form.pickupNote = value;
      },

      // Handle input from delivery note textarea
      handleTextareaDeliveryNote (value) {
        this.form.deliveryNote = value;
      },

      // Get actual value from package type select
      getListPackageTypeIdValue (value) {
        this.form.listPackageTypeId = value;
      },

      // Get actual value from insurance range select
      getListInsuranceRangeId (value) {
        this.form.listInsuranceRangeId = value;
      },

      // Get actual value from pickup date picker
      // TODO: Make format locale aware + use proper converter
      getPickupDateValue (value) {
        this.form.pickupDate = value;
      },

      // Get actual value from delivery date picker
      // TODO: Make format locale aware + use proper converter
      getDeliveryDateValue (value) {
        this.form.deliveryDate = value;
      },

      // Get actual value from pickup time picker
      getPickupTimeValue (value) {
        this.form.pickupTime = value;
      },

      // Get actual value from delivery time picker
      getDeliveryTimeValue (value) {
        this.form.deliveryTime = value;
      },

      // Input filter for uploaded files
      inputFilter (newFile, oldFile, prevent) {
        // Before adding a file
        if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
          // Create a blob field
          newFile.blob = '';
          let URL = window.URL || window.webkitURL;
          if (URL && URL.createObjectURL) {
            newFile.blob = URL.createObjectURL(newFile.file);
          }

          // Thumbnails
          newFile.thumb = '';
          if (newFile.blob && newFile.type.substr(0, 6) === 'image/') {
            newFile.thumb = newFile.blob;
          }
        }
      },

      // Input file for uploaded files
      inputFile (newFile, oldFile) {
        if (newFile && oldFile) {
          // Uploaded successfully
          if (newFile.success !== oldFile.success) {
            this.form.photoPath = newFile.response.file_path;

            if (Const.LOG_LEVEL >= Const.LOG_DEBUG) {
              console.log('File uploaded successfully - ' + this.form.photoPath);
            }
          }

          // Upload error
          if (newFile.error !== oldFile.error) {
            if (Const.LOG_LEVEL >= Const.LOG_DEBUG) {
              console.log('File upload failed - ' + newFile.error);
            }
          }
        }

        // Automatic upload
        if (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error) {
          if (!this.$refs.upload.active) {
            this.$refs.upload.active = true;
          }
        }
      }

    }
  };
</script>

<style scoped>
  .upload label.btn {
    margin-bottom: 0;
    margin-right: 1rem;
  }

  .upload .drop-active {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    position: fixed;
    z-index: 9999;
    opacity: .6;
    text-align: center;
    background: #000;
  }

  .upload .drop-active h3 {
    margin: -.5em 0 0;
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    font-size: 40px;
    color: #fff;
    padding: 0;
  }
</style>
