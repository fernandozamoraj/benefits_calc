<template lang='html'>
<div class="col s6 m6">
    <div class="row" id="invalid-message" data-validation-id="0">

    </div>
    <div class="row">
        <div class="input-field col s12 m12 onehd" data-validation-id="1">
            <input placeholder="First Name" id="first-name" type="text" class="validate" v-model="FirstName" required>
        </div>
    </div>
    <div class="row">
        <div class="input-field col s12 m12 onehd" data-validation-id="2">
            <input placeholder="Last Name" id="last-name" type="text" class="validate" v-model="LastName" required>
        </div>
    </div>
    <div class="row">
        <div class="input-field col s12 m12 onehd" data-validation-id="3">
            <input placeholder="01/01/1972" id="date-of-birth" type="text" class="validate" v-model="DateOfBirth" required>
        </div>
    </div>
    <div class="row">

        <div class=" col s6 m6" id="is-employee-div" data-validation-id="4">
            <input id="is-employee" type="checkbox" v-on:click="isEmployeeChanged" v-model="IsEmployee">
            <label for="is-employee">Employee</label>
        </div>


        <div class="col s6 m6" id="is-spouse-div" data-validation-id="5">
            <input id="is-spouse" type="checkbox" v-on:click="isSpouseChanged" v-model="IsSpouse">
            <label for="is-spouse">Spouse</label>
        </div>

    </div>
    <div class="row">
        <div class="col s6 m6 onehd">
            <button class="waves-effect waves-light btn teal darken-3" id="btn-calculate" v-on:click="calculate">
                <i class="material-icons right">attach_money</i>Calculate
            </button>
        </div>
        <div class="col s6 m6 onehd">
            <button class="waves-effect waves-light btn teal darken-3" id="btn-add-member" v-on:click="add">
                <i class="material-icons right">arrow_forward</i>Add
            </button>
        </div>
    </div>
</div>
<script>
    export default{

    }
</script>