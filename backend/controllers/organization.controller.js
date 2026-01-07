import organizationService from "../services/organization.service.js";

class organizationController {

    // create organization
    async create_organization (req, res) {
        try {
            const {orgName, code, orgEmail, phone, address, userName, userEmail, password, role, createdBy} = req.body;
            if (!orgName || !code || !orgEmail || !phone || !address || !userName || !userEmail || !password || !role || !createdBy) {
                return res.status(400).json({message: "All fields are required"});
            };

            const {organization, admin} = await organizationService.create_organization(req.body);
            return res.status(201).json({message: "Organization created successfully", organization, admin});
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    };

    // get all organizations
    async get_all_organizations (req, res) {
        try {
            const organizations = await organizationService.get_all_organizations();
            return res.status(200).json({message: "All organizations", organizations});
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    };

    // get single organization
    async get_organization (req, res) {
        try {
            const { org_id } = req.params;
            const organization = await organizationService.get_organization(org_id);
            return res.status(200).json({message: "Organization found", organization});
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    };

    // update organization
    async update_organization (req, res) {
        try {
            const { org_id } = req.params;
            const {orgName, code, orgEmail, phone, address} = req.body;

            const organization = await organizationService.update_organization(org_id, req.body);
            return res.status(200).json({message: "Organization updated successfully", organization});
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    };

    // activate/deactivate organization
    async activate_deactivate_organization (req, res) {
        try {
            const { org_id } = req.params;
            const { status } = req.body;

            const organization = await organizationService.activate_deactivate_organization(org_id, status);
            return res.status(200).json({message: "Organization updated successfully", organization});
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    };

    // delete organization
    async delete_organization (req, res) {
        try {
            const { org_id } = req.params;
            const organization = await organizationService.delete_organization(org_id);
            return res.status(200).json({message: "Organization deleted successfully!", organization})
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    };
};

export default new organizationController();