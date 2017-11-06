var data = {
    results: {
        EmployeeName: '',
        AnnualSalary: 0.0,
        FamilyMembers: 0,
        AnnualCosts: 0.0,
        EmployerDiscounts: 0.0,
        AdjustedPeriodPayAmount: 0.0,
        PerPeriodCosts: 0.0
    }
}

var template =
     '   <div class="col s6 m6">'+
     '       <div class="row">'+
     '           <div class="col s12">'+
     '               <ul class="collection" style="border: none;">'+
     '                   <li class="collection-item avatar blue-grey lighten-5" style="margin: 5px; border-radius: 10px;">'+
     '                       <span class="bold"></span><br />'+
     '                       <p>'+
     '                           <span class="blue-grey-text lighten-3"></span> <span class="grey-text lighten-2">{{computedResults.EmployeeName}}</span><br>'+
     '                           <span class="blue-grey-text lighten-3">Family Members:</span> <span class="grey-text lighten-2">{{computedResults.FamilyMembers}}</span><br>' +
     '                           <span class="blue-grey-text lighten-3">Annual Salary:</span> <span class="grey-text lighten-2">{{computedResults.AnnualSalary}}</span><br>' +
     '                           <span class="blue-grey-text lighten-3">Annual Costs:</span> <span class="grey-text lighten-2">{{computedResults.AnnualCosts}}</span><br>' +
     '                           <span class="blue-grey-text lighten-3">Per Period Costs:</span> <span class="grey-text lighten-2">{{computedResults.PerPeriodCosts}}</span><br>' +
     '                           <span class="blue-grey-text lighten-3">Employer Discounts:</span> <span class="grey-text lighten-2">{{computedResults.EmployerDiscounts}}</span><br>' +
     '                           <span class="blue-grey-text lighten-3">Adjusted Pay Period:</span> <span class="grey-text lighten-2">{{computedResults.AdjustedPeriodPayAmount}}</span><br>' +
     '                       </p>'+
     '                       <a href="#!" class="secondary-content"><i class="material-icons icon-black">attach_money</i></a>'+
     '                   </li>'+
     '               </ul>'+
     '           </div>' +
     '       </div>' +
     '       <div class="row">'+
     '           <div class="col s6 m6 onehd">' +
     '           <button class="waves-effect waves-light btn teal darken-3" id="btn-calculate" v-on:click="fireOffCalculations">' +
     '               <i class="material-icons right">attach_money</i>Calculate' +
     '           </button>' +
     '       </div>' +
     '   </div>';

Vue.component('calculated-results-component', {
    template: template,
    props: ['results'],
    methods: {
        fireOffCalculations: function (){
            this.$emit('calculate');
        },
    },
    computed: {

        computedResults: function (){
            console.log("In computed results")
            console.log(this.results)

            if (this.results){
                return this.results;
            }

            return data.results;
        }
    },
    data: function (){
        return data;
    }
})