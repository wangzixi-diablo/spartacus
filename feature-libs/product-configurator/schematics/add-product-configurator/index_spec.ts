import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import {
  Schema as ApplicationOptions,
  Style,
} from '@schematics/angular/application/schema';
import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
import {
  LibraryOptions as SpartacusProductConfiguratorOptions,
  SPARTACUS_CONFIGURATION_MODULE,
  SPARTACUS_SCHEMATICS,
} from '@spartacus/schematics';
import * as path from 'path';
import { peerDependencies } from '../../package.json';
import { CLI_CPQ_FEATURE, CLI_TEXTFIELD_FEATURE } from '../constants';

const collectionPath = path.join(__dirname, '../collection.json');
const featureModulePath =
  'src/app/spartacus/features/product-configurator/product-configurator-feature.module.ts';

describe('Spartacus product configurator schematics: ng-add', () => {
  const schematicRunner = new SchematicTestRunner('schematics', collectionPath);

  let appTree: UnitTestTree;

  const workspaceOptions: WorkspaceOptions = {
    name: 'workspace',
    version: '0.5.0',
  };

  const appOptions: ApplicationOptions = {
    name: 'schematics-test',
    inlineStyle: false,
    inlineTemplate: false,
    routing: false,
    style: Style.Scss,
    skipTests: false,
    projectRoot: '',
  };

  const libraryNoFeaturesOptions: SpartacusProductConfiguratorOptions = {
    project: 'schematics-test',
    lazy: true,
    features: [],
  };

  const cpqOptions: SpartacusProductConfiguratorOptions = {
    ...libraryNoFeaturesOptions,
    features: [CLI_CPQ_FEATURE],
  };

  const textfieldOptions: SpartacusProductConfiguratorOptions = {
    ...libraryNoFeaturesOptions,
    features: [CLI_TEXTFIELD_FEATURE],
  };

  beforeEach(async () => {
    schematicRunner.registerCollection(
      SPARTACUS_SCHEMATICS,
      '../../projects/schematics/src/collection.json'
    );

    appTree = await schematicRunner
      .runExternalSchematicAsync(
        '@schematics/angular',
        'workspace',
        workspaceOptions
      )
      .toPromise();
    appTree = await schematicRunner
      .runExternalSchematicAsync(
        '@schematics/angular',
        'application',
        appOptions,
        appTree
      )
      .toPromise();
    appTree = await schematicRunner
      .runExternalSchematicAsync(
        SPARTACUS_SCHEMATICS,
        'ng-add',
        { ...libraryNoFeaturesOptions, name: 'schematics-test' },
        appTree
      )
      .toPromise();
  });

  describe('Without features', () => {
    beforeEach(async () => {
      appTree = await schematicRunner
        .runSchematicAsync('ng-add', libraryNoFeaturesOptions, appTree)
        .toPromise();
    });

    it('should install necessary Spartacus libraries', () => {
      const packageJson = JSON.parse(appTree.readContent('package.json'));
      let dependencies: Record<string, string> = {};
      dependencies = { ...packageJson.dependencies };
      dependencies = { ...dependencies, ...packageJson.devDependencies };

      for (const toAdd in peerDependencies) {
        // skip the SPARTACUS_SCHEMATICS, as those are added only when running by the Angular CLI, and not in the testing environment
        if (
          !peerDependencies.hasOwnProperty(toAdd) ||
          toAdd === SPARTACUS_SCHEMATICS
        ) {
          continue;
        }
        // TODO: after 4.0: use this test, as we'll have synced versions between lib's and root package.json
        // const expectedVersion = (peerDependencies as Record<
        //   string,
        //   string
        // >)[toAdd];
        const expectedDependency = dependencies[toAdd];
        expect(expectedDependency).toBeTruthy();
        // expect(expectedDependency).toEqual(expectedVersion);
      }
    });
  });

  describe('Product config feature', () => {
    describe('Rulebased', () => {
      describe('general setup', () => {
        beforeEach(async () => {
          appTree = await schematicRunner
            .runSchematicAsync('ng-add', libraryNoFeaturesOptions, appTree)
            .toPromise();
        });

        it('should add the feature using the lazy loading syntax', async () => {
          const module = appTree.readContent(featureModulePath);
          expect(module).toMatchSnapshot();
        });

        describe('styling', () => {
          it('should create a proper scss file', () => {
            const scssContent = appTree.readContent(scssFilePath);
            expect(scssContent).toMatchSnapshot();
          });

          it('should update angular.json', async () => {
            const content = appTree.readContent('/angular.json');
            expect(content).toMatchSnapshot();
          });
        });
      });

      describe('eager loading', () => {
        beforeEach(async () => {
          appTree = await schematicRunner
            .runSchematicAsync(
              'ng-add',
              { ...libraryNoFeaturesOptions, lazy: false },
              appTree
            )
            .toPromise();
        });

        it('should import appropriate modules', async () => {
          const module = appTree.readContent(featureModulePath);
          expect(module).toMatchSnapshot();
        });
      });
    });

    describe('Rulebased with CPQ', () => {
      describe('general setup', () => {
        beforeEach(async () => {
          appTree = await schematicRunner
            .runSchematicAsync('ng-add', cpqOptions, appTree)
            .toPromise();
        });

        it('should add the feature using the lazy loading syntax', async () => {
          const module = appTree.readContent(featureModulePath);
          expect(module).toMatchSnapshot();
        });

        describe('styling', () => {
          it('should create a proper scss file', () => {
            const scssContent = appTree.readContent(scssFilePath);
            expect(scssContent).toMatchSnapshot();
          });

          it('should update angular.json', async () => {
            const content = appTree.readContent('/angular.json');
            expect(content).toMatchSnapshot();
          });
        });

        describe('b2b features', () => {
          it('configuration should be added', () => {
            const configurationModule = appTree.readContent(
              `src/app/spartacus/${SPARTACUS_CONFIGURATION_MODULE}.module.ts`
            );
            expect(configurationModule).toMatchSnapshot();
          });
        });
      });

      describe('eager loading', () => {
        beforeEach(async () => {
          appTree = await schematicRunner
            .runSchematicAsync(
              'ng-add',
              { ...cpqOptions, lazy: false },
              appTree
            )
            .toPromise();
        });

        it('should import appropriate modules', async () => {
          const module = appTree.readContent(featureModulePath);
          expect(module).toMatchSnapshot();
        });
      });
    });

    describe('Rulebased with Textfield', () => {
      describe('general setup', () => {
        beforeEach(async () => {
          appTree = await schematicRunner
            .runSchematicAsync('ng-add', textfieldOptions, appTree)
            .toPromise();
        });

        it('should add the feature using the lazy loading syntax', async () => {
          const module = appTree.readContent(featureModulePath);
          expect(module).toMatchSnapshot();
        });

        describe('styling', () => {
          it('should create a proper scss file', () => {
            const scssContent = appTree.readContent(scssFilePath);
            expect(scssContent).toMatchSnapshot();
          });

          it('should update angular.json', async () => {
            const content = appTree.readContent('/angular.json');
            expect(content).toMatchSnapshot();
          });
        });

        describe('b2b features', () => {
          it('configuration should not be added', () => {
            const configurationModule = appTree.readContent(
              `src/app/spartacus/${SPARTACUS_CONFIGURATION_MODULE}.module.ts`
            );
            expect(configurationModule).toMatchSnapshot();
          });
        });
      });

      describe('eager loading', () => {
        beforeEach(async () => {
          appTree = await schematicRunner
            .runSchematicAsync(
              'ng-add',
              { ...textfieldOptions, lazy: false },
              appTree
            )
            .toPromise();
        });

        it('should import appropriate modules', async () => {
          const module = appTree.readContent(featureModulePath);
          expect(module).toMatchSnapshot();
        });
      });
    });

    describe('Rulebased with both CPQ and Textfield', () => {
      describe('general setup', () => {
        beforeEach(async () => {
          appTree = await schematicRunner
            .runSchematicAsync(
              'ng-add',
              {
                ...libraryNoFeaturesOptions,
                features: [CLI_CPQ_FEATURE, CLI_TEXTFIELD_FEATURE],
              },
              appTree
            )
            .toPromise();
        });

        it('should add the feature using the lazy loading syntax', async () => {
          const module = appTree.readContent(featureModulePath);
          expect(module).toMatchSnapshot();
        });

        describe('styling', () => {
          it('should create a proper scss file', () => {
            const scssContent = appTree.readContent(scssFilePath);
            expect(scssContent).toMatchSnapshot();
          });

          it('should update angular.json', async () => {
            const content = appTree.readContent('/angular.json');
            expect(content).toMatchSnapshot();
          });
        });

        describe('b2b features', () => {
          it('configuration should be added', () => {
            const configurationModule = appTree.readContent(
              `src/app/spartacus/${SPARTACUS_CONFIGURATION_MODULE}.module.ts`
            );
            expect(configurationModule).toMatchSnapshot();
          });
        });
      });

      describe('eager loading', () => {
        beforeEach(async () => {
          appTree = await schematicRunner
            .runSchematicAsync(
              'ng-add',
              {
                ...libraryNoFeaturesOptions,
                features: [CLI_CPQ_FEATURE, CLI_TEXTFIELD_FEATURE],
                lazy: false,
              },
              appTree
            )
            .toPromise();
        });

        it('should import appropriate modules', async () => {
          const module = appTree.readContent(featureModulePath);
          expect(module).toMatchSnapshot();
        });
      });
    });
  });
});
