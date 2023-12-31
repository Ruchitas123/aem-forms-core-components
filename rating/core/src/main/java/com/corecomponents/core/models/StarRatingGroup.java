/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 ~ Copyright 2022 Adobe
 ~
 ~ Licensed under the Apache License, Version 2.0 (the "License");
 ~ you may not use this file except in compliance with the License.
 ~ You may obtain a copy of the License at
 ~
 ~     http://www.apache.org/licenses/LICENSE-2.0
 ~
 ~ Unless required by applicable law or agreed to in writing, software
 ~ distributed under the License is distributed on an "AS IS" BASIS,
 ~ WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 ~ See the License for the specific language governing permissions and
 ~ limitations under the License.
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
 package com.corecomponents.core.models;

 import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.ArrayUtils;
//import javax.annotation.Nullable;
 import org.apache.sling.api.SlingHttpServletRequest;
 import org.apache.sling.api.resource.Resource;
 import org.apache.sling.models.annotations.Exporter;
 import org.apache.sling.models.annotations.Model;
 import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
 import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.osgi.annotation.versioning.ConsumerType;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.forms.core.components.util.AbstractBaseImpl;
import com.fasterxml.jackson.annotation.JsonIgnore;

 
 @Model(
     adaptables = { SlingHttpServletRequest.class, Resource.class },
     adapters = { StarRatingGroup.class,
         ComponentExporter.class },
     resourceType = { StarRatingGroup.STAR_RESOURCE_TYPE })
 @Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
 public class StarRatingGroup extends AbstractBaseImpl {

    public final static String STAR_RESOURCE_TYPE = "corecomponents/components/adaptiveForm/starrating";

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    private Integer starnumber;

 
    public Integer getStarnumber() {
        return starnumber;
    }

    @JsonIgnore
    public Object[] getRatingList() {
        List<String> ls = new ArrayList<>();

        for(int i = 0; i < starnumber; i++) {
            ls.add(i);
        }
        return ls.toArray();
    }

 }
