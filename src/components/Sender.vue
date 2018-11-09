<template>
  <smooth-reflow>
    <container>
      <row class="mt-5 align-items-center justify-content-center">
        <column md="6">
          <form @submit="onSubmit" @reset="onReset" enctype="multipart/form-data" novalidate v-if="showForm">
            <p class="h4 text-center mb-4">{{ $t('message.sender.pageTitle') }}</p>
            <div class="grey-text">

              <div class="input-select-custom input-group">
                <mdb-select-custom @getValue="getListDocumentTypeIdValue" id="listDocumentTypeId"
                                   name="listDocumentTypeId" required v-validate="'included:'+documentTypesListIds"
                                   :validationError="errors.first('listDocumentTypeId')">
                  <option selected disabled value="0">{{ $t('message.sender.selectDefaultDocumentType') }}</option>
                  <option v-for="documentType in documentTypesList" :value="documentType.id">{{
                    $t('message.lists.documentType.'+documentType.document_type) }}
                  </option>
                </mdb-select-custom>
                <label for="listDocumentTypeId">{{ $t('message.sender.labelDocumentType') }}</label>
              </div>

              <div class="md-form input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="scanFrontPrefix">{{ $t('message.sender.prefixScanFront') }}</span>
                </div>
                <div class="custom-file">
                  <input type="file" class="custom-file-input" id="scanFront" name="scanFront"
                         aria-describedby="scanFrontPrefix" v-validate="'required|mimes:image/*,application/pdf'"
                         @change="form.scanFrontFiles=$event.target.files">
                  <label class="custom-file-label" for="scanFront">{{ $t('message.sender.labelScanFront') }}</label>
                </div>
                <div v-if="errors.first('scanFront')" class="invalid-feedback-custom">{{errors.first('scanFront')}}
                </div>
              </div>

              <div class="md-form input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="scanBackPrefix">{{ $t('message.sender.prefixScanBack') }}</span>
                </div>
                <div class="custom-file">
                  <input type="file" class="custom-file-input" id="scanBack" name="scanBack"
                         aria-describedby="scanBackPrefix" v-validate="'mimes:image/*,application/pdf'"
                         @change="form.scanBackFiles=$event.target.files">
                  <label class="custom-file-label" for="scanBack">{{ $t('message.sender.labelScanBack') }}</label>
                </div>
                <div v-if="errors.first('scanBack')" class="invalid-feedback-custom">{{errors.first('scanBack')}}</div>
              </div>

              <div class="custom-control custom-checkbox mb-3">
                <input v-model="form.agreementChecked" type="checkbox" class="custom-control-input"
                       id="agreementChecked" name="agreementChecked" v-validate="'required'">
                <label class="custom-control-label" for="agreementChecked">{{ $t('message.sender.labelAgreementCheck')
                  }}</label>
                <div v-if="errors.first('agreementChecked')" class="invalid-feedback-custom">
                  {{errors.first('agreementChecked')}}
                </div>
              </div>

              <!--TODO use checkbox from MDB-->
              <!--<mdb-input type="checkbox" id="checkbox1" label="Material unchecked" />-->

            </div>
            <div class="text-center">
              <btn color="primary" type="submit">{{ $t('message.sender.buttonBecomeSender') }}</btn>
              <btn outline="primary" type="reset">{{ $t('message.sender.buttonReset') }}</btn>
            </div>
          </form>
        </column>
      </row>

      <modal v-if="showSenderRegistrationSuccessModal" @close="showSenderRegistrationSuccessModal = false" success>
        <modal-header>
          <modal-title>{{ $t('message.sender.registrationSuccessTitle') }}</modal-title>
        </modal-header>
        <modal-body>
          <row>
            <column col="3" class="text-center">
              <fa icon="check" size="4x"/>
            </column>
            <column col="9">
              <p>{{ $t('message.sender.registrationSuccessText') }}</p>
            </column>
          </row>
        </modal-body>
        <modal-footer center>
          <btn color="success" @click.native="showSenderRegistrationSuccessModal = false; $router.push({name: 'Home'})">
            {{ $t('message.sender.registrationSuccessButton') }}
          </btn>
        </modal-footer>
      </modal>

      <modal v-if="showSenderRegistrationFailedModal" @close="showSenderRegistrationFailedModal = false" danger>
        <modal-header>
          <modal-title>{{ $t('message.sender.registrationFailedTitle') }}</modal-title>
        </modal-header>
        <modal-body>
          <row>
            <column col="3" class="text-center">
              <fa icon="exclamation" size="4x"/>
            </column>
            <column col="9">
              <p>{{ $t('message.sender.registrationFailedText') }}</p>
            </column>
          </row>
        </modal-body>
        <modal-footer center>
          <btn color="danger" @click.native="showSenderRegistrationFailedModal = false">{{
            $t('message.sender.registrationFailedButton') }}
          </btn>
        </modal-footer>
      </modal>
    </container>
  </smooth-reflow>
</template>

<script>
  import * as Const from '../const';
  import { Btn, Column, Container, Fa, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Row } from 'mdbvue';
  import mdbInputCustom from './gui/MdbInputCustom';
  import mdbSelectCustom from './gui/MdbSelectCustom';
  import raketa from '../api/raketa';

  export default {
    name: 'sender',
    components: {
      Btn,
      Column,
      Container,
      Fa,
      Modal,
      ModalBody,
      ModalFooter,
      ModalHeader,
      ModalTitle,
      Row,
      mdbInputCustom,
      mdbSelectCustom
    },
    data () {
      return {
        form: {
          listDocumentTypeId: 0,
          scanFrontFiles: [],
          scanBackFiles: [],
          agreementChecked: false,
          agreementCheckedAt: null
        },
        showForm: true,
        showSenderRegistrationSuccessModal: false,
        showSenderRegistrationFailedModal: false
      };
    },
    computed: {
      documentTypesList () {
        return this.$store.state.lists.documentTypes;
      },
      documentTypesListIds () {
        let ids = [];
        this.$store.state.lists.documentTypes.forEach(function (element) {
          ids.push(element.id);
        });
        return ids.join(',');
      }
    },
    watch: {
      'form.agreementChecked' () {
        if (this.form.agreementChecked) {
          let date = new Date();
          this.form.agreementCheckedAt = date.toISOString();
        } else {
          this.form.agreementCheckedAt = null;
        }
      }
    },
    methods: {
      // Submit registration form
      onSubmit (event, formData) {
        event.preventDefault();

        this.$validator.validate()
          .then(result => {
            if (result) {
              console.log('validation OK');
              // Validation is OK, proceed with sender registration
              let formData = new FormData();
              let scanFrontFile = (this.form.scanFrontFiles.length > 0) ? this.form.scanFrontFiles[0] : null;
              let scanBackFile = (this.form.scanBackFiles.length > 0) ? this.form.scanBackFiles[0] : null;

              formData.append('list_document_type_id', this.form.listDocumentTypeId);
              formData.append('agreement_checked_at', this.form.agreementCheckedAt);
              if (scanFrontFile) {
                formData.append('scan_front', scanFrontFile, scanFrontFile.name);
              }
              if (scanBackFile) {
                formData.append('scan_back', scanBackFile, scanBackFile.name);
              }

              if (Const.LOG_LEVEL >= Const.LOG_DEBUG) {
                console.log(formData);
              }

              // Call crete sender API
              raketa.createSender(this.$store.state.user.id, formData)
                .then(response => {
                  // User was created
                  if (Const.LOG_LEVEL >= Const.LOG_DEBUG) {
                    console.log('✓ Sender created');
                  }

                  // Refresh user data
                  this.$store.dispatch('getUserData');

                  this.showSenderRegistrationSuccessModal = true;
                })
                .catch(response => {
                  if (Const.LOG_LEVEL >= Const.LOG_DEBUG) {
                    console.log('✗ Sender registration failed');
                  }
                  this.showSenderRegistrationFailedModal = true;
                });
            }
          });
      },

      // Reset form to original state
      onReset (event) {
        event.preventDefault();

        // Reset our form values
        this.form.listDocumentTypeId = 0;
        this.form.scanFront = [];
        this.form.scanBack = [];
        this.form.agreementChecked = false;
        this.form.agreementCheckedAt = null;

        // Trick to reset/clear native browser form validation state
        this.showForm = false;
        this.$nextTick(() => {this.showForm = true;});
      },

      // Get actual value from select
      getListDocumentTypeIdValue (value) {
        this.form.listDocumentTypeId = value;
      }
    }
  };
</script>

<style scoped>

</style>
