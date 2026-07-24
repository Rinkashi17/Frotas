import { ServiceRuleList } from "@/components/servicerule/ServiceRuleList";
import { getServicesRules } from "@/services/servicesrules";


export default async function ServiceRulesPage() {

    console.log("ENTROU NA PAGE FUNCTION")

    const serviceRules = await getServicesRules();

    return (
        <ServiceRuleList
            serviceRules={serviceRules}
        />
    )
}