/**
 * External dependencies
 */
import { map, assign, includes } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	ToggleControl,
	CheckboxControl,
} from '@wordpress/components';

/**
 * Add the User Roles control to the main Visibility By User Role control
 *
 * @since 1.0.0
 * @param {Object} props All the props passed to this function
 * @return {string}		 Return the rendered JSX
 */
export default function UserRoles( props ) {
	const { attributes, setAttributes } = props;
	const { blockVisibility } = attributes;
	const {	restrictedRoles } = blockVisibility;
	
	// This is a global variable added to the page via PHP
    const roles = blockVisibilityUserRoles;
	
    return (
        <div className="bv-settings__user-roles">
			<label className="bv-settings__user-roles-label">
				{ __( 'Restrict by User Role', 'block-visibility' ) }
			</label>
			<p className="bv-settings__user-roles-help">
				{ __( 
					'The block will only be visible to users with one of the selected roles', 
					'block-visibility' 
				) }
			</p>
			<div className="bv-settings__user-roles-control">
				{ roles.map( ( role ) => {
					let newRestrictedRoles = [ ...restrictedRoles ];
					const isChecked = restrictedRoles.includes( role.name );
									
					if ( isChecked ) {
						const index = newRestrictedRoles.indexOf( role.name );
						index > -1 && newRestrictedRoles.splice(index, 1);
					} else {
						newRestrictedRoles.indexOf( role.name ) === -1 && 
						newRestrictedRoles.push( role.name );
					}
					
					return (
						<CheckboxControl
							checked={ isChecked }
							label={ <span>{ role.title }</span> }
							onChange={ () => setAttributes( {
									blockVisibility: assign( 
										{ ...blockVisibility }, 
										{ restrictedRoles: newRestrictedRoles } 
									)
								} )
							}
						/>
					)
				} ) }
			</div>
        </div>
    );
}