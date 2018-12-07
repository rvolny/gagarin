<template>
  <smooth-reflow>
    <container>
      <row class="mt-5 align-items-center justify-content-center">
        <column md="6">
          <form @submit="onSubmit" @reset="onReset" enctype="multipart/form-data" novalidate v-if="showForm">
            <p class="h4 text-center mb-4">{{ $t('message.courier.pageTitle') }}</p>
            <div class="grey-text">

              <div class="input-select-custom input-group">
                <mdb-select-custom @getValue="getListDocumentTypeIdValue" id="listDocumentTypeId"
                                   name="listDocumentTypeId" required v-validate="'included:'+documentTypesListIds"
                                   :validationError="errors.first('listDocumentTypeId')">
                  <option selected disabled value="0">{{ $t('message.courier.selectDefaultDocumentType') }}</option>
                  <option v-for="documentType in documentTypesList" :value="documentType.id">{{
                    $t('message.lists.documentType.'+documentType.document_type) }}
                  </option>
                </mdb-select-custom>
                <label for="listDocumentTypeId">{{ $t('message.courier.labelDocumentType') }}</label>
              </div>

              <mdb-file-input-custom id="scanFront" name="scanFront" btnColor="primary"
                                     :btnTitle="$t('message.courier.labelScanFront')"
                                     :textFieldTitle="$t('message.courier.prefixScanFront')"
                                     v-validate="'required|mimes:image/*,application/pdf'"
                                     :validationError="errors.first('scanFront')"
                                     @change.native="form.scanFrontFiles=$event.target.files"/>

              <mdb-file-input-custom id="scanBack" name="scanBack" btnColor="primary"
                                     :btnTitle="$t('message.courier.labelScanBack')"
                                     :textFieldTitle="$t('message.courier.prefixScanBack')"
                                     v-validate="'mimes:image/*,application/pdf'"
                                     :validationError="errors.first('scanBack')"
                                     @change.native="form.scanBackFiles=$event.target.files"/>

              <mdb-input-custom type="checkbox" id="agreementChecked" name="agreementChecked"
                                :label="$t('message.courier.labelAgreementCheck')"
                                v-validate="'required'"
                                :validationError="errors.first('agreementChecked')"
                                @change="form.agreementChecked=$event"/>

            </div>
            <div class="text-center">
              <btn color="primary" type="submit">{{ $t('message.courier.buttonBecomeSender') }}</btn>
              <btn outline="primary" type="reset">{{ $t('message.courier.buttonReset') }}</btn>
            </div>
          </form>
        </column>
      </row>

      <modal v-if="showSenderRegistrationSuccessModal" @close="showSenderRegistrationSuccessModal = false" success>
        <modal-header>
          <modal-title>{{ $t('message.courier.registrationSuccessTitle') }}</modal-title>
        </modal-header>
        <modal-body>
          <row>
            <column col="3" class="text-center">
              <fa icon="check" size="4x"/>
            </column>
            <column col="9">
              <p>{{ $t('message.courier.registrationSuccessText') }}</p>
            </column>
          </row>
        </modal-body>
        <modal-footer center>
          <btn color="success" @click.native="showSenderRegistrationSuccessModal = false; $router.push({name: 'Home'})">
            {{ $t('message.courier.registrationSuccessButton') }}
          </btn>
        </modal-footer>
      </modal>

      <modal v-if="showSenderRegistrationFailedModal" @close="showSenderRegistrationFailedModal = false" danger>
        <modal-header>
          <modal-title>{{ $t('message.courier.registrationFailedTitle') }}</modal-title>
        </modal-header>
        <modal-body>
          <row>
            <column col="3" class="text-center">
              <fa icon="exclamation" size="4x"/>
            </column>
            <column col="9">
              <p>{{ $t('message.courier.registrationFailedText') }}</p>
            </column>
          </row>
        </modal-body>
        <modal-footer center>
          <btn color="danger" @click.native="showSenderRegistrationFailedModal = false">{{
            $t('message.courier.registrationFailedButton') }}
          </btn>
        </modal-footer>
      </modal>
    </container>
  </smooth-reflow>
</template>

<script>
  import * as Const from '../const';
  import { Btn, Column, Container, Fa, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Row } from 'mdbvue';
  import mdbFileInputCustom from './gui/MdbFileInputCustom';
  import mdbInputCustom from './gui/MdbInputCustom';
  import mdbSelectCustom from './gui/MdbSelectCustom';
  import raketa from '../api/raketa';

  export default {
    name: 'courier',
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
      mdbFileInputCustom,
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

              // Call crete sender API
              raketa.createCourier(this.$store.state.user.id, formData)
                .then(response => {
                  // Courier was created
                  if (Const.LOG_LEVEL >= Const.LOG_DEBUG) {
                    console.log('✓ Courier created');
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
