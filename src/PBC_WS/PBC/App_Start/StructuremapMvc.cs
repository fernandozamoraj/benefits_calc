// --------------------------------------------------------------------------------------------------------------------
// <copyright file="StructuremapMvc.cs" company="Web Advanced">
// Copyright 2012 Web Advanced (www.webadvanced.com)
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// </copyright>
// --------------------------------------------------------------------------------------------------------------------

using PBC.App_Start;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Dependencies;
using System.Web.Mvc;
using WebActivatorEx;
using StructureMap;
using PBC.App.Controllers;
using PBC.App.Services;
using PBC.Services;
using PBC.Repos;

[assembly: PreApplicationStartMethod(typeof(StructuremapMvc), "Start")]
[assembly: ApplicationShutdownMethod(typeof(StructuremapMvc), "End")]

namespace PBC.App_Start {
	using System.Web.Mvc;

    using Microsoft.Web.Infrastructure.DynamicModuleHelper;

	using PBC.DependencyResolution;

    using StructureMap;
    
	public static class StructuremapMvc {
        #region Public Properties

        public static StructureMapDependencyScope StructureMapDependencyScope { get; set; }

        #endregion
		
		#region Public Methods and Operators
		
		public static void End() {
            StructureMapDependencyScope.Dispose();
        }
		
        public static void Start() {
            IContainer container = IoC.Initialize();

            container.Configure(
                 c =>
                 {
                    
                    c.Scan(scanner =>
                    {
                        scanner.Assembly("PBC");
                        scanner.Assembly("PBC.Models");
                        scanner.Assembly("PBC.Repos");
                        scanner.Assembly("PBC.Services");

                        /* TODO: remove this
                        scanner.WithDefaultConventions();
                        scanner.IncludeNamespaceContainingType<BenefitsController>();
                        scanner.IncludeNamespaceContainingType<IModelMapper>();
                        scanner.IncludeNamespaceContainingType<IEmployeeRepository>();
                        scanner.IncludeNamespaceContainingType<IAppConfiguration>();
                        */
                        scanner.WithDefaultConventions();
                    });
                 }
                );
            StructureMapDependencyScope = new StructureMapDependencyScope(container);
            DependencyResolver.SetResolver(StructureMapDependencyScope);
            DynamicModuleUtility.RegisterModule(typeof(StructureMapScopeModule));
        }

        #endregion
    }
}