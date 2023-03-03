/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import Collection_dropdown2 from "../../components/dropdown/collection_dropdown2";
import {
  collectionDropdown2_data,
  EthereumDropdown2_data,
} from "../../data/dropdown";
import { FileUploader } from "react-drag-drop-files";
import Proparties_modal from "../../components/modal/proparties_modal";
import { useDispatch } from "react-redux";
import { showPropatiesModal } from "../../redux/counterSlice";
import Meta from "../../components/Meta";
import { celebrityRegistration } from "../../utils/resquests";

// ..fields['name'] = model.name ?? ''
//       ..fields['email'] = model.email ?? ''
//       ..fields['phone'] = model.phone ?? ''
//       ..fields['social_media_profile'] = model.socialMediaProfile ?? ''
//       ..fields['invitation_code'] = model.invitationCode ?? ''
//       ..fields['title'] = title.text
//       ..fields['sub_title'] = subTitle.text
// profile_photo
// profile_video

type FieldKeyType =
'name'
| 'email'
| 'phone'
| 'social_media_profile'
| 'invitation_code'
| 'title'
| 'sub_title'
| 'profile_photo'
| 'profile_video';

type InputType = 
'text'
| 'email'
| 'phone'
| 'file'
| 'video'
| 'image';

interface FieldItemType {
    name: string;
    label: string;
    type: InputType;
    fieldKey: FieldKeyType;
    placeholder?: string;
    value?: string;
    required?: boolean;
    fileTypes?: string [];
}

const fieldsData: FieldItemType[] = [
    {
        name: "name",
        label: "Name",
        type: "text",
        fieldKey: "name",
        placeholder: "Enter your name",
        required: true,
    },
    {
        name: "email",
        label: "Email",
        type: "email",
        fieldKey: "email",
        placeholder: "Enter your email",
        required: true,
    },
    {
        name: "phone",
        label: "Phone",
        type: "phone",
        fieldKey: "phone",

        placeholder: "Enter your phone",
        required: true,
    },
    {
        name: "social_media_profile",
        label: "Social Media Profile",
        type: "text",
        fieldKey: "social_media_profile",
        placeholder: "Enter your social media profile",
        required: true,
    },
    {

        name: "invitation_code",
        label: "Invitation Code",
        type: "text",
        fieldKey: "invitation_code",
        placeholder: "Enter your invitation code",
        required: false,
    },
    {
        name: "title",
        label: "Title",
        type: "text",
        fieldKey: "title",
        placeholder: "Enter your title",
        required: true,
    },
    {
        name: "sub_title",
        label: "Sub Title",
        type: "text",
        fieldKey: "sub_title",
        placeholder: "Enter your sub title",
        required: true,
    },
    {
        name: "profile_photo",
        label: "Profile Photo",
        type: "image",
        fieldKey: "profile_photo",
        placeholder: "Enter your profile photo",
        required: true,
        fileTypes: ["JPG", "PNG", "GIF", "SVG", "WEBP", "BMP", "TIFF"],
    },
    {
        name: "profile_video",
        label: "Profile Video",
        type: "video",
        fieldKey: "profile_video",
        placeholder: "Enter your profile video",
        required: false,
        fileTypes: ["MP4", "WEBM", "AVI", "MOV", "WMV", "FLV", "MKV"],
    },
];

const CelebReg = () => {
  const fileTypes = [
    "JPG",
    "PNG",
    "GIF",
    "SVG",
    "MP4",
    "WEBM",
    "MP3",
    "WAV",
    "OGG",
    "GLB",
    "GLTF",
  ];
  const [file, setFile] = useState("");

  const dispatch = useDispatch();

  const [fields, setFields] = useState<{ [key in FieldKeyType]?: string }>({});
  const [files, setFiles] = useState<{ [key in FieldKeyType]?: File }>({});
  
  const [errors, setErrors] = useState<{ [key in FieldKeyType]?: string }>({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (file) => {
    setFile(file.name);
  };

  const handleFileChange = (key: FieldKeyType) => (file: any) => {
    if (file) {
        setFiles((prev) => ({ ...prev, [key]: file }));
        setFields((prev) => ({ ...prev, [key]: file.name }));
    }
  }

  const handleSubmit = () => {
    setLoading(true);

    const errors: { [key in FieldKeyType]?: string } = {};

    fieldsData.forEach((field) => {
        if (field.required && !fields[field.fieldKey]) {
            errors[field.fieldKey] = `${field.label} is required`;
        }
    });

    if (Object.keys(errors).length) {
        console.log(errors)
        setErrors(errors);
        setLoading(false);
        return;
    } else {
        setErrors({});
    }

    const formData = new FormData();

    Object.keys(fields).forEach((key) => {
        if (key !== 'profile_photo' && key !== 'profile_video')
            formData.append(key, fields[key]);
    });

    Object.keys(files).forEach((key) => {
        formData.append(key, files[key]);
    });

    celebrityRegistration(formData)
        .then((res) => {
            console.log(res);
            setLoading(false);
            setSuccessMsg(res?.message || "Registration successful");
            setFields({});
            setFiles({});
        })
        .catch((err) => {
            console.log(err);
            setLoading(false);
        });
  }

  const popupItemData = [
    {
      id: 1,
      name: "proparties",
      text: "Textual traits that show up as rectangles.",
      icon: "proparties-icon",
    },
    {
      id: 2,
      name: "levels",
      text: "Numerical traits that show as a progress bar.",
      icon: "level-icon",
    },
    {
      id: 3,
      name: "stats",
      text: "Numerical traits that just show as numbers.",
      icon: "stats-icon",
    },
  ];
  return (
    <div>
      <Meta title="Create || Xhibiter | NFT Marketplace Next.js Template" />
      {/* <!-- Create --> */}
      <section className="relative py-24">
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          <img
            src="/images/gradient_light.jpg"
            alt="gradient"
            className="h-full w-full"
          />
        </picture>
        <div className="container">
          <h1 className="text-jacarta-700 py-16 text-center text-4xl font-medium dark:text-white">
            Register as a Celebrity
          </h1>

          <div className="mx-auto max-w-[48.125rem]">
            {fieldsData.map((item, index) => {
                const id = 'item-' + item.fieldKey;

                if (item.type === 'file' || item.type === 'image' || item.type === 'video') {
                    return (
                        <div key={index} className="mb-6">
                            <label className="font-display text-jacarta-700 mb-2 block dark:text-white">
                                {item.label}
                                {item.required && <span className="text-red">*</span>}
                            </label>

                            {files[item.fieldKey] ? (
                                <p className="dark:text-jacarta-300 text-2xs mb-3">
                                    successfully uploaded : {files[item.fieldKey]?.name}
                                </p>
                            ) : (
                                <p className="dark:text-jacarta-300 text-2xs mb-3">
                                    Drag or choose your file to upload
                                </p>
                            )}

                            <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 group relative flex max-w-md flex-col items-center justify-center rounded-lg border-2 border-dashed bg-white py-20 px-5 text-center">
                                <div className="relative z-10 cursor-pointer">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        height="24"
                                        className="fill-jacarta-500 mb-4 inline-block dark:fill-white"
                                    >
                                        <path fill="none" d="M0 0h24v24H0z" />
                                        <path d="M16 13l6.964 4.062-2.973.85 2.125 3.681-1.732 1-2.125-3.68-2.223 2.15L16 13zm-2-7h2v2h5a1 1 0 0 1 1 1v4h-2v-3H10v10h4v2H9a1 1 0 0 1-1-1v-5H6v-2h2V9a1 1 0 0 1 1-1h5V6zM4 14v2H2v-2h2zm0-4v2H2v-2h2zm0-4v2H2V6h2zm0-4v2H2V2h2zm4 0v2H6V2h2zm4 0v2h-2V2h2zm4 0v2h-2V2h2z" />
                                    </svg>
                                    <p className="dark:text-jacarta-300 mx-auto max-w-xs text-xs">
                                        {/* JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max */}
                                        {item.fileTypes?.join(", ")}
                                        {item.type === 'image' && ' Max size: 800 KB'}
                                        {item.type === 'video' && ' Max size: 100 MB'}
                                        {/* size: 100 MB */}
                                    </p>
                                </div>
                                <div className="dark:bg-jacarta-600 bg-jacarta-50 absolute inset-4 cursor-pointer rounded opacity-0 group-hover:opacity-100 ">
                                <FileUploader
                                    handleChange={handleFileChange(item.fieldKey)}
                                    name="file"
                                    value={files[item.fieldKey]}
                                    types={item.fileTypes || fileTypes}
                                    classes="file-drag"
                                    maxSize={100}
                                    minSize={0}
                                />
                                </div>
                            </div>
                        </div>
                    )
                }

                return (
                    <div key={index} className="mb-6">
                        <label
                            htmlFor={id}
                            className="font-display text-jacarta-700 mb-2 block dark:text-white"
                        >
                            {item.label}{item.required && <span className="text-red">*</span>}
                        </label>
                        <input
                            type={item.type}
                            name={item.name}
                            title={item.label}
                            value={fields[item.fieldKey]}
                            onChange={(e) => setFields({ ...fields, [item.fieldKey]: e.target.value })}
                            id={id}
                            className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                            placeholder={item.placeholder}
                            required={item.required}
                        />
                    </div>
                )
            })}

            {/* submit button */}
            <div className="flex justify-center">
                <button
                    type="submit"
                    className="bg-accent hover:bg-accent/80 focus:ring-accent/50 focus:ring-2 focus:outline-none text-white font-display font-semibold rounded-lg py-3 px-8 mt-6"
                    onClick={handleSubmit}
                >
                    Submit
                </button>

                {successMsg && (
                    <div className="text-green-500 text-xs font-display font-semibold">
                        {successMsg}
                    </div>
                )}

                {loading && (
                    <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    </div>
                )}

                {errors && (
                    <div className="text-red-500 text-xs font-display font-semibold">
                        {Object.keys(errors).map((key, index) => (
                            <p key={index}>{errors[key]}</p>
                        ))}
                    </div>
                )}
            </div>
          </div>

        </div>
      </section>
      {/* <!-- end create --> */}
    </div>
  );
};

export default CelebReg;